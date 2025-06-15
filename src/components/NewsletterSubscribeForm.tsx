
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
    const { error } = await supabase.from("newsletter_subscribers").insert({ email });
    setSubmitting(false);

    if (error) {
      if (error.code === "23505") {
        setSuccess(true);
        toast({ title: "Již přihlášeno", description: "Tento e-mail je již přihlášen k newsletteru." });
      } else {
        toast({ title: "Chyba při přihlášení", description: error.message || "Zkuste to prosím znovu." });
      }
    } else {
      setSuccess(true);
      toast({ title: "Přihlášeno!", description: "Brzy Vám přijde newsletter do e-mailu." });
    }
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
