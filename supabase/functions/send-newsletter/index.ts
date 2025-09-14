
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

// Minimal DB client for edge functions (no import from src)
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

console.log("Newsletter send function starting...");

/** 
 * Helper to call the REST API for Supabase from Edge
 */
async function supabaseRequest(endpoint: string, options: any = {}) {
  const url = `${SUPABASE_URL}/rest/v1/${endpoint}`;
  const headers = {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
    ...options.headers,
  };
  
  console.log(`Making Supabase request to: ${url}`);
  return fetch(url, { ...options, headers });
}

// JSON parse with safety:
async function safeJson(req: Request) {
  try { 
    const json = await req.json(); 
    console.log("Parsed request JSON:", json);
    return json;
  } catch (e) { 
    console.error("Failed to parse JSON:", e);
    return {};
  }
}

serve(async (req: Request) => {
  console.log(`Received ${req.method} request`);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    console.error("Method not allowed:", req.method);
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405, 
      headers: corsHeaders
    });
  }

  try {
    // Check if Resend API key is available
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("RESEND_API_KEY not found in environment");
      return new Response(JSON.stringify({ 
        error: "RESEND_API_KEY not configured",
        status: "failed" 
      }), {
        status: 500, 
        headers: corsHeaders
      });
    }

    const resend = new Resend(resendApiKey);

    const { newsletter_id } = await safeJson(req);
    if (!newsletter_id) {
      console.error("Missing newsletter_id in request");
      return new Response(JSON.stringify({ 
        error: "Missing newsletter_id",
        status: "failed" 
      }), {
        status: 400, 
        headers: corsHeaders
      });
    }

    console.log(`Processing newsletter with ID: ${newsletter_id}`);

    // 1. Load newsletter
    const newsletterRes = await supabaseRequest(`newsletters?id=eq.${newsletter_id}`, { method: "GET" });
    
    if (!newsletterRes.ok) {
      console.error("Failed to fetch newsletter:", newsletterRes.status, newsletterRes.statusText);
      return new Response(JSON.stringify({ 
        error: `Failed to fetch newsletter: ${newsletterRes.statusText}`,
        status: "failed" 
      }), { 
        status: 500, 
        headers: corsHeaders 
      });
    }

    const newsletterArr = await newsletterRes.json();
    const newsletter = newsletterArr[0];

    if (!newsletter) {
      console.error("Newsletter not found");
      return new Response(JSON.stringify({ 
        error: "Newsletter not found",
        status: "failed" 
      }), { 
        status: 404, 
        headers: corsHeaders 
      });
    }

    if (newsletter.sent_at) {
      console.error("Newsletter already sent");
      return new Response(JSON.stringify({ 
        error: "Newsletter already sent",
        status: "failed" 
      }), { 
        status: 400, 
        headers: corsHeaders 
      });
    }

    console.log(`Newsletter loaded: ${newsletter.subject}`);

    // 2. Load all active subscribers
    const subsRes = await supabaseRequest("newsletter_subscribers?unsubscribed_at=is.null&select=email", { method: "GET" });
    
    if (!subsRes.ok) {
      console.error("Failed to fetch subscribers:", subsRes.status, subsRes.statusText);
      return new Response(JSON.stringify({ 
        error: `Failed to fetch subscribers: ${subsRes.statusText}`,
        status: "failed" 
      }), { 
        status: 500, 
        headers: corsHeaders 
      });
    }

    const subscribers = await subsRes.json();

    if (!Array.isArray(subscribers) || subscribers.length === 0) {
      console.error("No subscribers found");
      return new Response(JSON.stringify({ 
        error: "No subscribers found",
        status: "failed" 
      }), { 
        status: 400, 
        headers: corsHeaders 
      });
    }

    console.log(`Found ${subscribers.length} subscribers`);

    // 3. Send newsletter to all
    const from = "ETFstory.cz <newsletter@etfstory.cz>";
    let successCnt = 0, failCnt = 0;
    let errors: string[] = [];

    for (const s of subscribers) {
      try {
        console.log(`Sending to: ${s.email}`);
        await resend.emails.send({
          from,
          to: [s.email],
          subject: newsletter.subject,
          html: newsletter.body,
        });
        successCnt++;
        console.log(`✓ Sent to ${s.email}`);
      } catch (e) {
        failCnt++;
        const errorMsg = `Failed to ${s.email}: ${e?.message || e}`;
        errors.push(errorMsg);
        console.error(`✗ ${errorMsg}`);
      }
    }

    console.log(`Sending complete. Success: ${successCnt}, Failed: ${failCnt}`);

    // Mark as sent if any were delivered
    if (successCnt > 0) {
      console.log("Marking newsletter as sent...");
      const updateRes = await supabaseRequest(
        `newsletters?id=eq.${newsletter_id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sent_at: new Date().toISOString() }),
        }
      );

      if (!updateRes.ok) {
        console.error("Failed to mark newsletter as sent:", updateRes.status, updateRes.statusText);
      } else {
        console.log("Newsletter marked as sent successfully");
      }
    }

    const result = {
      sent: successCnt,
      failed: failCnt,
      errors: errors.slice(0, 10), // Limit errors to first 10
      total: subscribers.length,
      status: successCnt === 0 ? "failed" : "ok",
    };

    console.log("Final result:", result);

    return new Response(JSON.stringify(result), { 
      headers: corsHeaders
    });

  } catch (error: any) {
    console.error("Unexpected error:", error);
    return new Response(JSON.stringify({ 
      error: error.message || String(error),
      status: "failed" 
    }), {
      status: 500, 
      headers: corsHeaders
    });
  }
});
