import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { sanitizeText } from "@/utils/sanitize";
import NewsletterSubscribersList, { Subscriber } from "@/components/newsletter/NewsletterSubscribersList";
import NewsletterForm from "@/components/newsletter/NewsletterForm";
import NewsletterList, { Newsletter } from "@/components/newsletter/NewsletterList";
import CSVUploader from "@/components/CSVUploader";
import { parseCSV } from "@/utils/csvParser";
import { useETFData } from "@/hooks/useETFData";

const NewsletterAdminPage: React.FC = () => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [sending, setSending] = useState(false);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [showSubscribers, setShowSubscribers] = useState(false);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const { upsertETFs, getETFCount } = useETFData();
  const [etfCount, setEtfCount] = useState(0);

  const reloadNewsletters = () => {
    supabase
      .from("newsletters")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setNewsletters(data as Newsletter[]);
      });
  };

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

  const loadETFCount = async () => {
    const count = await getETFCount();
    setEtfCount(count);
  };

  useEffect(() => {
    reloadNewsletters();
    reloadSubscribers();
    loadETFCount();
  }, []);

  const handleCSVUpload = async (csvContent: string) => {
    try {
      console.log('Zpracovávám CSV obsah...');
      const parsedETFs = parseCSV(csvContent);
      console.log('Úspěšně naparsováno', parsedETFs.length, 'ETF fondů');
      
      // Upsert do databáze
      await upsertETFs(parsedETFs);
      
      // Aktualizovat počet ETF fondů
      await loadETFCount();
      
      toast({
        title: "CSV soubor úspěšně nahrán",
        description: `${parsedETFs.length} ETF fondů bylo aktualizováno v databázi.`,
      });
      
    } catch (error) {
      console.error('Chyba při zpracování CSV:', error);
      toast({
        title: "Chyba při zpracování CSV",
        description: "Nepodařilo se nahrát a zpracovat CSV soubor.",
        variant: "destructive",
      });
    }
  };

  // Validate and sanitize input
  const validateInput = (subject: string, body: string): boolean => {
    if (!subject.trim() || subject.trim().length < 3) {
      toast({
        title: "Neplatný předmět",
        description: "Předmět musí obsahovat alespoň 3 znaky.",
        variant: "destructive",
      });
      return false;
    }

    if (!body.trim() || body.trim().length < 10) {
      toast({
        title: "Neplatný obsah",
        description: "Obsah musí obsahovat alespoň 10 znaků.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSendNewsletter = async (newsletterId: string) => {
    if (!window.confirm("Opravdu chcete odeslat tento newsletter všem odběratelům? Akce je nevratná."))
      return;

    setSendingId(newsletterId);

    try {
      const { data: result, error } = await supabase.functions.invoke('send-newsletter', {
        body: { newsletter_id: newsletterId }
      });

      if (error) {
        console.error("Edge function error:", error);
        toast({
          title: "Chyba při odesílání",
          description: error.message || "Neznámá chyba při volání funkce.",
          variant: "destructive",
        });
      } else if (result?.status === "failed" || result?.error) {
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
      console.error("Network error:", e);
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
    
    const sanitizedSubject = sanitizeText(subject);
    const sanitizedBody = body; // Don't sanitize here, will be sanitized in component and edge function

    if (!validateInput(sanitizedSubject, sanitizedBody)) {
      return;
    }

    setSending(true);
    
    try {
      const { error } = await supabase
        .from("newsletters")
        .insert({ 
          subject: sanitizedSubject, 
          body: sanitizedBody,
          sent_by: null // Removed user dependency
        });

      if (error) {
        toast({ 
          title: "Chyba", 
          description: error.message,
          variant: "destructive",
        });
      } else {
        setSubject("");
        setBody("");
        toast({ 
          title: "Newsletter uložen", 
          description: "Zpráva byla uložena, připravte rozeslání." 
        });
        reloadNewsletters();
      }
    } catch (error: any) {
      toast({
        title: "Chyba",
        description: "Nepodařilo se uložit newsletter.",
        variant: "destructive",
      });
    }
    
    setSending(false);
  };

  return (
    <div className="max-w-3xl mx-auto my-10">
      <h1 className="text-3xl font-bold mb-6">Newsletter Admin</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Aktualizace ETF databáze</h2>
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            Aktuální počet ETF fondů v databázi: <strong>{etfCount}</strong>
          </p>
        </div>
        <CSVUploader onFileUpload={handleCSVUpload} />
      </div>

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
