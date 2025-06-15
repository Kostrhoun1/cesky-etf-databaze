
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { sanitizeText } from "@/utils/sanitize";

const NewsletterUnsubscribe: React.FC = () => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleUnsubscribe = async (e: React.FormEvent) => {
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

    setLoading(true);
    
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .update({ unsubscribed_at: new Date().toISOString() })
        .eq("email", sanitizedEmail);

      setLoading(false);

      if (error) {
        toast({ 
          title: "Chyba", 
          description: "Nepodařilo se odhlásit. Zkuste to později.",
          variant: "destructive",
        });
        return;
      }
      
      setDone(true);
    } catch (error: any) {
      setLoading(false);
      toast({
        title: "Chyba",
        description: "Nastala neočekávaná chyba. Zkuste to prosím znovu.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Odhlášení z newsletteru</h1>
      {done ? (
        <div className="text-green-700 bg-green-50 px-4 py-3 rounded">
          Byli jste odhlášeni z newsletteru. Pokud jste svůj e-mail nenašli, kontaktujte nás.
        </div>
      ) : (
        <form onSubmit={handleUnsubscribe} className="flex flex-col gap-4">
          <label className="font-semibold text-sm">Zadejte váš e-mail</label>
          <Input
            type="email"
            placeholder="vas@email.cz"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
            maxLength={254}
          />
          <Button type="submit" disabled={loading || !email.trim()}>
            {loading ? "Odhlašuji..." : "Odhlásit se"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default NewsletterUnsubscribe;
