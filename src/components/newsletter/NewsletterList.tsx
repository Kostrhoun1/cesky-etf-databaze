
import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export type Newsletter = {
  id: string;
  created_at: string;
  subject: string;
  body: string;
  sent_at: string | null;
  sent_by: string | null;
};

interface NewsletterListProps {
  newsletters: Newsletter[];
  onSend?: (newsletterId: string) => void;
  sendingId?: string | null;
}

const NewsletterList: React.FC<NewsletterListProps> = ({
  newsletters,
  onSend,
  sendingId,
}) => (
  <div className="bg-white rounded shadow p-6">
    <h2 className="text-xl font-semibold mb-3">Odeslané a připravené newslettery</h2>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Předmět</TableHead>
          <TableHead>Vytvořeno</TableHead>
          <TableHead>Odesláno</TableHead>
          <TableHead>Akce</TableHead>
          <TableHead>Ukázka obsahu</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {newsletters.map((nl) => (
          <TableRow key={nl.id}>
            <TableCell>{nl.subject}</TableCell>
            <TableCell>{new Date(nl.created_at).toLocaleString()}</TableCell>
            <TableCell>
              {nl.sent_at ? (
                <span className="text-green-700">{new Date(nl.sent_at).toLocaleString()}</span>
              ) : (
                <span className="text-gray-500">Neodesláno</span>
              )}
            </TableCell>
            <TableCell>
              {!nl.sent_at ? (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => onSend && onSend(nl.id)}
                  disabled={!!sendingId}
                >
                  {sendingId === nl.id ? "Odesílá se..." : "Odeslat"}
                </Button>
              ) : (
                <span className="text-xs text-gray-400">✔ Odesláno</span>
              )}
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
);

export default NewsletterList;
