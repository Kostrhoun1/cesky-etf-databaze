
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { sanitizeText } from "@/utils/sanitize";

const NewsletterSubscribeForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const sanitizedEmail = sanitizeText(email.trim().toLowerCase());
    
    if (!validateEmail(sanitizedEmail)) {
      toast({ 
        title: "Neplatný email", 
        description: "Zadejte platný email.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      // Try to insert new subscriber
      const { error: insertError } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: sanitizedEmail });

      if (!insertError) {
        setSuccess(true);
        setSubmitting(false);
        toast({ 
          title: "Přihlášeno!", 
          description: "Brzy Vám přijde newsletter do e-mailu." 
        });
        return;
      }

      // Handle duplicate email case
      if (insertError.code === "23505") {
        const { data, error: selectError } = await supabase
          .from("newsletter_subscribers")
          .select("id, unsubscribed_at")
          .eq("email", sanitizedEmail)
          .maybeSingle();

        if (selectError) {
          setSubmitting(false);
          toast({ 
            title: "Chyba ověření", 
            description: selectError.message,
            variant: "destructive",
          });
          return;
        }

        // Re-subscribe if previously unsubscribed
        if (data && data.unsubscribed_at) {
          const { error: updateError } = await supabase
            .from("newsletter_subscribers")
            .update({ 
              unsubscribed_at: null, 
              subscribed_at: new Date().toISOString() 
            })
            .eq("id", data.id);

          setSubmitting(false);

          if (!updateError) {
            setSuccess(true);
            toast({ 
              title: "Znovupřihlášeno!", 
              description: "Váš e-mail byl znovu přihlášen k odběru newsletteru." 
            });
          } else {
            toast({ 
              title: "Chyba při obnově přihlášení", 
              description: updateError.message,
              variant: "destructive",
            });
          }
          return;
        }

        // Already subscribed
        setSubmitting(false);
        setSuccess(true);
        toast({ 
          title: "Již přihlášeno", 
          description: "Tento e-mail je již přihlášen k newsletteru." 
        });
        return;
      }

      setSubmitting(false);
      toast({ 
        title: "Chyba při přihlášení", 
        description: insertError.message || "Zkuste to prosím znovu.",
        variant: "destructive",
      });
    } catch (error: unknown) {
      setSubmitting(false);
      toast({
        title: "Chyba",
        description: "Nastala neočekávaná chyba. Zkuste to prosím znovu.",
        variant: "destructive",
      });
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
        maxLength={254}
      />
      <Button type="submit" disabled={submitting || !email.trim()}>
        {submitting ? "Přihlašuji..." : "Přihlásit se"}
      </Button>
    </form>
  );
};

export default NewsletterSubscribeForm;
