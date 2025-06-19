
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const AuthButton: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Chyba při odhlášení",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Odhlášení úspěšné",
        description: "Byli jste úspěšně odhlášeni.",
      });
      navigate('/');
    }
  };

  if (loading) {
    return <div className="w-20 h-10 bg-gray-200 animate-pulse rounded"></div>;
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">
          {user.email}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSignOut}
        >
          Odhlásit se
        </Button>
      </div>
    );
  }

  return (
    <Button asChild size="sm">
      <Link to="/auth">
        Přihlásit se / Registrovat
      </Link>
    </Button>
  );
};

export default AuthButton;
