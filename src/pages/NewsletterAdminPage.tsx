
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

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

  // Load previously sent newsletters
  useEffect(() => {
    supabase
      .from("newsletters")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setNewsletters(data as Newsletter[]);
      });
  }, []);

  // For demonstration: For "sending", we just save to the newsletters table
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !body) {
      toast({ title: "Vyplňte předmět a obsah" });
      return;
    }
    setSending(true);
    const { error } = await supabase
      .from("newsletters")
      .insert({ subject, body }); // sent_at a sent_by budou null prozatím

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
    <div className="max-w-2xl mx-auto my-10">
      <h1 className="text-3xl font-bold mb-6">Newsletter Admin</h1>
      <form onSubmit={handleSend} className="bg-white rounded shadow p-6 space-y-4 mb-8">
        <Input
          type="text"
          placeholder="Předmět"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          disabled={sending}
        />
        <Textarea
          placeholder="Obsah newsletteru..."
          value={body}
          onChange={e => setBody(e.target.value)}
          rows={8}
          disabled={sending}
        />
        <Button type="submit" disabled={sending}>
          {sending ? "Odesílám..." : "Uložit newsletter"}
        </Button>
      </form>

      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-3">Odeslané a připravené newslettery</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Předmět</TableHead>
              <TableHead>Vytvořeno</TableHead>
              <TableHead>Odesláno</TableHead>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default NewsletterAdminPage;
