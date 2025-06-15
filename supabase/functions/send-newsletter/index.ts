
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Minimal DB client for edge functions (no import from src)
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

/** 
 * Helper to call the REST API for Supabase from Edge
 */
async function supabaseRequest(endpoint: string, options: any = {}) {
  const url = `${SUPABASE_URL}/rest/v1/${endpoint}`;
  const headers = {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    ...options.headers,
  };
  return fetch(url, { ...options, headers });
}

// JSON parse with safety:
async function safeJson(req: Request) {
  try { return await req.json(); } catch { return {}; }
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  try {
    const { newsletter_id } = await safeJson(req);
    if (!newsletter_id) {
      return new Response(JSON.stringify({ error: "Missing newsletter_id" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // 1. Load newsletter
    const newsletterRes = await supabaseRequest(`newsletters?id=eq.${newsletter_id}`, { method: "GET" });
    const newsletterArr = await newsletterRes.json();
    const newsletter = newsletterArr[0];

    if (!newsletter) {
      return new Response(JSON.stringify({ error: "Newsletter not found" }), { status: 404, headers: corsHeaders });
    }

    if (newsletter.sent_at) {
      return new Response(JSON.stringify({ error: "Newsletter already sent" }), { status: 400, headers: corsHeaders });
    }

    // 2. Load all active subscribers
    const subsRes = await supabaseRequest("newsletter_subscribers?unsubscribed_at=is.null&select=email", { method: "GET" });
    const subscribers = await subsRes.json();

    if (!Array.isArray(subscribers) || subscribers.length === 0) {
      return new Response(JSON.stringify({ error: "No subscribers found" }), { status: 400, headers: corsHeaders });
    }

    // 3. Send newsletter to all
    const from = "ETFstory.cz <newsletter@etfstory.cz>";
    let successCnt = 0, failCnt = 0;
    let errors: string[] = [];

    for (const s of subscribers) {
      try {
        await resend.emails.send({
          from,
          to: [s.email],
          subject: newsletter.subject,
          html: newsletter.body,
        });
        successCnt++;
      } catch (e) {
        failCnt++;
        errors.push(`Failed to ${s.email}: ${e?.message || e}`);
      }
    }

    // Mark as sent if any were delivered
    if (successCnt > 0) {
      await supabaseRequest(
        `newsletters?id=eq.${newsletter_id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sent_at: new Date().toISOString() }),
        }
      );
    }

    return new Response(JSON.stringify({
      sent: successCnt,
      failed: failCnt,
      errors,
      total: subscribers.length,
      status: successCnt === 0 ? "failed" : "ok",
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || String(error) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
