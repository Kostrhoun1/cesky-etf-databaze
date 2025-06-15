
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export type Subscriber = {
  id: string;
  email: string;
  subscribed_at: string;
  unsubscribed_at: string | null;
};

interface NewsletterSubscribersListProps {
  subscribers: Subscriber[];
  showSubscribers: boolean;
  setShowSubscribers: (upd: (prev: boolean) => boolean) => void;
}
const NewsletterSubscribersList: React.FC<NewsletterSubscribersListProps> = ({
  subscribers,
  showSubscribers,
  setShowSubscribers,
}) => (
  <>
    <div className="flex items-center justify-between mb-8">
      <div>
        <span className="font-semibold text-violet-700">
          Odběratelů:{" "}
          <span className="text-2xl font-mono">{subscribers.length}</span>
        </span>
      </div>
      <Button variant="outline" onClick={() => setShowSubscribers((v) => !v)}>
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
  </>
);

export default NewsletterSubscribersList;
