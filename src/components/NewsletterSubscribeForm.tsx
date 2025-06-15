
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const NewsletterSubscribeForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast({ title: "Neplatný email", description: "Zadejte platný email." });
      return;
    }
    setSubmitting(true);

    // Zkusíme insert – pokud selže na unique, znamená to, že už záznam existuje
    const { error: insertError } = await supabase
      .from("newsletter_subscribers")
      .insert({ email });

    if (!insertError) {
      setSuccess(true);
      setSubmitting(false);
      toast({ title: "Přihlášeno!", description: "Brzy Vám přijde newsletter do e-mailu." });
      return;
    }

    // Pokud chyba je "duplicate key", pokusíme se obnovit odběr update-em
    if (insertError.code === "23505") {
      // Zjistíme, zda již v DB existuje řádek s tímto e-mailem a zda je odhlášen
      const { data, error: selectError } = await supabase
        .from("newsletter_subscribers")
        .select("id, unsubscribed_at")
        .eq("email", email)
        .maybeSingle();

      if (selectError) {
        setSubmitting(false);
        toast({ title: "Chyba ověření", description: selectError.message });
        return;
      }

      // Pokud je unsubscribed_at nenulové, povolíme „znovupřihlášení“ update-em
      if (data && data.unsubscribed_at) {
        const { error: updateError } = await supabase
          .from("newsletter_subscribers")
          .update({ unsubscribed_at: null, subscribed_at: new Date().toISOString() })
          .eq("id", data.id);

        setSubmitting(false);

        if (!updateError) {
          setSuccess(true);
          toast({ title: "Znovupřihlášeno!", description: "Váš e-mail byl znovu přihlášen k odběru newsletteru." });
        } else {
          toast({ title: "Chyba při obnově přihlášení", description: updateError.message });
        }
        return;
      }

      // Pokud unsubscribed_at je null, je už přihlášen — standardní hláška
      setSubmitting(false);
      setSuccess(true);
      toast({ title: "Již přihlášeno", description: "Tento e-mail je již přihlášen k newsletteru." });
      return;
    }

    setSubmitting(false);
    toast({ title: "Chyba při přihlášení", description: insertError.message || "Zkuste to prosím znovu." });
  };

  if (success) {
    return (
      <div className="text-green-700 bg-green-50 px-4 py-3 rounded">
        Děkujeme za přihlášení! Budeme Vás informovat o novinkách.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-center">
      <Input
        type="email"
        required
        placeholder="Váš email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        disabled={submitting}
        className="max-w-xs"
      />
      <Button type="submit" disabled={submitting}>
        {submitting ? "Přihlašuji..." : "Přihlásit se"}
      </Button>
    </form>
  );
};

export default NewsletterSubscribeForm;
