
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import NewsletterSubscribersList, { Subscriber } from "@/components/newsletter/NewsletterSubscribersList";
import NewsletterForm from "@/components/newsletter/NewsletterForm";
import NewsletterList, { Newsletter } from "@/components/newsletter/NewsletterList";

const NewsletterAdminPage: React.FC = () => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [sending, setSending] = useState(false);

  // Nově
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [showSubscribers, setShowSubscribers] = useState(false);

  // Pro odesílání
  const [sendingId, setSendingId] = useState<string | null>(null);

  const reloadNewsletters = () => {
    supabase
      .from("newsletters")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setNewsletters(data as Newsletter[]);
      });
  };

  useEffect(() => {
    reloadNewsletters();
    // Získáme aktuální odběratele
    supabase
      .from("newsletter_subscribers")
      .select("*")
      .is("unsubscribed_at", null)
      .order("subscribed_at", { ascending: true })
      .limit(500)
      .then(({ data, error }) => {
        if (!error && data) setSubscribers(data as Subscriber[]);
      });
  }, []);

  const reloadSubscribers = () => {
    supabase
      .from("newsletter_subscribers")
      .select("*")
      .is("unsubscribed_at", null)
      .order("subscribed_at", { ascending: true })
      .limit(500)
      .then(({ data, error }) => {
        if (!error && data) setSubscribers(data as Subscriber[]);
      });
  };

  // Odeslat newsletter přes edge funkci
  const handleSendNewsletter = async (newsletterId: string) => {
    if (!window.confirm("Opravdu chcete odeslat tento newsletter všem odběratelům? Akce je nevratná."))
      return;

    setSendingId(newsletterId);

    try {
      const res = await fetch(
        "https://nbhwnatadyubiuadfakx.supabase.co/functions/v1/send-newsletter",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newsletter_id: newsletterId }),
        }
      );
      const result = await res.json();
      if (!res.ok || result.status === "failed" || result.error) {
        toast({
          title: "Chyba při odesílání",
          description:
            result.error ||
            (result.errors && result.errors.join(", ")) ||
            "Neznámá chyba.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Newsletter byl odeslán",
          description: `E-maily odeslány ${result.sent} odběratelům. Neúspěšné: ${result.failed}`,
        });
        reloadNewsletters();
      }
    } catch (e: any) {
      toast({
        title: "Chyba spojení",
        description: e.message,
        variant: "destructive",
      });
    }
    setSendingId(null);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !body) {
      toast({ title: "Vyplňte předmět a obsah" });
      return;
    }
    setSending(true);
    const { error } = await supabase
      .from("newsletters")
      .insert({ subject, body });

    setSending(false);

    if (error) {
      toast({ title: "Chyba", description: error.message });
    } else {
      setSubject("");
      setBody("");
      toast({ title: "Newsletter uložen", description: "Zpráva byla uložena, připravte rozeslání." });
      reloadNewsletters();
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10">
      <h1 className="text-3xl font-bold mb-6">Newsletter Admin</h1>

      <NewsletterSubscribersList
        subscribers={subscribers}
        showSubscribers={showSubscribers}
        setShowSubscribers={setShowSubscribers}
      />

      <NewsletterForm
        subject={subject}
        setSubject={setSubject}
        body={body}
        setBody={setBody}
        sending={sending}
        handleSend={handleSend}
      />

      <NewsletterList
        newsletters={newsletters}
        onSend={handleSendNewsletter}
        sendingId={sendingId}
      />
    </div>
  );
};

export default NewsletterAdminPage;
