
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import NewsletterSubscribersList, { Subscriber } from "@/components/newsletter/NewsletterSubscribersList";
import NewsletterForm from "@/components/newsletter/NewsletterForm";
import NewsletterList from "@/components/newsletter/NewsletterList";

type Newsletter = {
  id: string;
  created_at: string;
  subject: string;
  body: string;
  sent_at: string | null;
  sent_by: string | null;
};

const NewsletterAdminPage: React.FC = () => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [sending, setSending] = useState(false);

  // Nově - seznam odběratelů
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [showSubscribers, setShowSubscribers] = useState(false);

  useEffect(() => {
    // Získáme newslettery
    supabase
      .from("newsletters")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setNewsletters(data as Newsletter[]);
      });

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

  // Pro opakovaný reload po přihlášení nového
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

  // Stávající funkcionalita zůstává, jen přidáme reload odběratelů
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
      // reload newsletters
      supabase
        .from("newsletters")
        .select("*")
        .order("created_at", { ascending: false })
        .then(({ data, error }) => {
          if (!error && data) setNewsletters(data as Newsletter[]);
        });
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

      <NewsletterList newsletters={newsletters} />
    </div>
  );
};

export default NewsletterAdminPage;
