
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { sanitizeHTML, sanitizeText } from "@/utils/sanitize";

interface NewsletterFormProps {
  subject: string;
  setSubject: (val: string) => void;
  body: string;
  setBody: (val: string) => void;
  sending: boolean;
  handleSend: (e: React.FormEvent) => void;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({
  subject,
  setSubject,
  body,
  setBody,
  sending,
  handleSend,
}) => {
  const sanitizedBody = body ? sanitizeHTML(body) : '';

  return (
    <form onSubmit={handleSend} className="bg-white rounded shadow p-6 space-y-4 mb-8">
      <Input
        type="text"
        placeholder="Předmět"
        value={subject}
        onChange={e => setSubject(sanitizeText(e.target.value))}
        disabled={sending}
        maxLength={200}
      />
      <Textarea
        placeholder="Obsah newsletteru (HTML)..."
        value={body}
        onChange={e => setBody(e.target.value)}
        rows={8}
        disabled={sending}
        maxLength={50000}
      />
      <div className="text-xs text-gray-600">
        Obsah newsletteru můžete zadat jako čistý HTML kód. Doporučujeme HTML připravit v externím editoru (např. <a href="https://html.online/" target="_blank" rel="noopener noreferrer" className="underline text-violet-600">html.online</a>) a vložit zde. Nezapomeňte si před odesláním zkontrolovat vzhled v ukázce níže. 
        <br />Za správnost a bezpečnost vloženého HTML zodpovídáte Vy. Nebezpečný obsah bude automaticky odstraněn.
      </div>
      <Button type="submit" disabled={sending || !subject.trim() || !body.trim()}>
        {sending ? "Odesílám..." : "Uložit newsletter"}
      </Button>
      {sanitizedBody && (
        <div>
          <div className="font-semibold mb-1 mt-2 text-sm text-violet-700">Ukázka vzhledu (náhled):</div>
          <div
            className="border rounded bg-gray-50 p-4 text-sm prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: sanitizedBody }}
          />
        </div>
      )}
    </form>
  );
};

export default NewsletterForm;
