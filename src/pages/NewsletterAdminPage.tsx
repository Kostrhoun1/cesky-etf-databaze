
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

// Newsletter zůstává stejné
type Newsletter = {
  id: string;
  created_at: string;
  subject: string;
  body: string;
  sent_at: string | null;
  sent_by: string | null;
};

type Subscriber = {
  id: string;
  email: string;
  subscribed_at: string;
  unsubscribed_at: string | null;
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
      
      {/* Přehled odběratelů */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="font-semibold text-violet-700">
            Odběratelů:{" "}
            <span className="text-2xl font-mono">{subscribers.length}</span>
          </span>
        </div>
        <Button variant="outline" onClick={() => setShowSubscribers(v => !v)}>
          {showSubscribers ? "Skrýt seznam" : "Zobrazit všechny e-maily"}
        </Button>
      </div>

      {showSubscribers && (
        <div className="mb-10 bg-white rounded shadow p-6">
          <div className="font-semibold mb-3 text-sm text-violet-700">
            Seznam všech aktivních odběratelů ({subscribers.length})
          </div>
          <div className="overflow-auto max-h-80 border rounded bg-gray-50">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Přihlášeno</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscribers.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.email}</TableCell>
                    <TableCell>
                      {new Date(s.subscribed_at).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      <form onSubmit={handleSend} className="bg-white rounded shadow p-6 space-y-4 mb-8">
        <Input
          type="text"
          placeholder="Předmět"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          disabled={sending}
        />
        <Textarea
          placeholder="Obsah newsletteru (HTML)..."
          value={body}
          onChange={e => setBody(e.target.value)}
          rows={8}
          disabled={sending}
        />
        <div className="text-xs text-gray-600">
          Obsah newsletteru můžete zadat jako čistý HTML kód. Doporučujeme HTML připravit v externím editoru (např. <a href="https://html.online/" target="_blank" rel="noopener noreferrer" className="underline text-violet-600">html.online</a>) a vložit zde. Nezapomeňte si před odesláním zkontrolovat vzhled v ukázce níže. 
          <br />Za správnost a bezpečnost vloženého HTML zodpovídáte Vy.
        </div>
        <Button type="submit" disabled={sending}>
          {sending ? "Odesílám..." : "Uložit newsletter"}
        </Button>
        {body && (
          <div>
            <div className="font-semibold mb-1 mt-2 text-sm text-violet-700">Ukázka vzhledu (náhled):</div>
            <div
              className="border rounded bg-gray-50 p-4 text-sm prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: body }}
            />
          </div>
        )}
      </form>

      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-3">Odeslané a připravené newslettery</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Předmět</TableHead>
              <TableHead>Vytvořeno</TableHead>
              <TableHead>Odesláno</TableHead>
              <TableHead>Ukázka obsahu</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {newsletters.map(nl => (
              <TableRow key={nl.id}>
                <TableCell>{nl.subject}</TableCell>
                <TableCell>{new Date(nl.created_at).toLocaleString()}</TableCell>
                <TableCell>
                  {nl.sent_at ? new Date(nl.sent_at).toLocaleString() : <span className="text-gray-500">Neodesláno</span>}
                </TableCell>
                <TableCell>
                  <div
                    className="max-h-32 overflow-auto border rounded p-2 text-xs bg-gray-50 prose prose-xs max-w-none"
                    dangerouslySetInnerHTML={{ __html: nl.body }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default NewsletterAdminPage;

