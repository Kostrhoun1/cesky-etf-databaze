
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { sanitizeText } from "@/utils/sanitize";
import NewsletterSubscribersList, { Subscriber } from "@/components/newsletter/NewsletterSubscribersList";
import NewsletterForm from "@/components/newsletter/NewsletterForm";
import NewsletterList, { Newsletter } from "@/components/newsletter/NewsletterList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LoginForm: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast({
          title: "Chyba při přihlášení",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Přihlášení úspěšné",
          description: "Vítejte v admin rozhraní!",
        });
        onLogin();
      }
    } catch (error: any) {
      toast({
        title: "Chyba",
        description: "Něco se pokazilo. Zkuste to znovu.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            Admin přihlášení
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Heslo"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Přihlašuji...' : 'Přihlásit se'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const NewsletterAdminPageContent: React.FC = () => {
  const { user } = useAuth();
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [sending, setSending] = useState(false);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [showSubscribers, setShowSubscribers] = useState(false);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCheckLoading, setAdminCheckLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Check if user is admin
      supabase
        .from('app_admins')
        .select('user_email')
        .eq('user_email', user.email)
        .maybeSingle()
        .then(({ data, error }) => {
          if (!error && data) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
          setAdminCheckLoading(false);
        });
    } else {
      setAdminCheckLoading(false);
    }
  }, [user]);

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

  useEffect(() => {
    if (isAdmin) {
      reloadNewsletters();
      reloadSubscribers();
    }
  }, [isAdmin]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Chyba při odhlášení",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setIsAdmin(false);
      toast({
        title: "Odhlášení úspěšné",
        description: "Byli jste úspěšně odhlášeni.",
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
          sent_by: user?.id 
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

  if (adminCheckLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Načítání...</p>
      </div>
    );
  }

  if (!user) {
    return <LoginForm onLogin={() => {}} />;
  }

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Přístup odepřen</h1>
          <p className="text-gray-600 mb-4">Nemáte oprávnění k přístupu na tuto stránku.</p>
          <Button onClick={handleSignOut}>
            Odhlásit se
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Newsletter Admin</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{user.email}</span>
          <Button variant="outline" onClick={handleSignOut}>
            Odhlásit se
          </Button>
        </div>
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

const NewsletterAdminPage: React.FC = () => {
  return <NewsletterAdminPageContent />;
};

export default NewsletterAdminPage;
