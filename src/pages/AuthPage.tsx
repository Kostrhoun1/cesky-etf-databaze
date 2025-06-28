
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/Layout';

interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSignUp = async (email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });
    
    return { error };
  };

  const handleSignIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    return { error };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { email, password, confirmPassword } = formData;

    // Validation
    if (!email || !password) {
      setError('Prosím vyplňte všechna povinná pole');
      setLoading(false);
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Hesla se neshodují');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Heslo musí mít alespoň 6 znaků');
      setLoading(false);
      return;
    }

    try {
      let result;
      
      if (isLogin) {
        result = await handleSignIn(email, password);
      } else {
        result = await handleSignUp(email, password);
      }

      if (result.error) {
        // Handle specific error cases
        if (result.error.message.includes('Invalid login credentials')) {
          setError('Neplatné přihlašovací údaje');
        } else if (result.error.message.includes('User already registered')) {
          setError('Uživatel s tímto emailem již existuje');
        } else if (result.error.message.includes('Email not confirmed')) {
          setError('Email nebyl potvrzen. Zkontrolujte svou emailovou schránku.');
        } else {
          setError(result.error.message);
        }
      } else {
        if (isLogin) {
          setMessage('Úspěšně přihlášeno! Přesměrovávám...');
          setTimeout(() => navigate('/'), 1000);
        } else {
          setMessage('Registrace úspěšná! Zkontrolujte svou emailovou schránku pro potvrzení.');
        }
      }
    } catch (err) {
      setError('Nastala neočekávaná chyba. Zkuste to prosím znovu.');
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError(null);
    setMessage(null);
    setFormData({
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                {isLogin ? 'Přihlášení' : 'Registrace'}
              </CardTitle>
              <CardDescription>
                {isLogin 
                  ? 'Přihlaste se ke svému účtu' 
                  : 'Vytvořte si nový účet'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="vas@email.cz"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Heslo</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Alespoň 6 znaků"
                    required
                  />
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Potvrzení hesla</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword || ''}
                      onChange={handleInputChange}
                      placeholder="Zopakujte heslo"
                      required
                    />
                  </div>
                )}

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {message && (
                  <Alert>
                    <AlertDescription>{message}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading 
                    ? (isLogin ? 'Přihlašuji...' : 'Registruji...') 
                    : (isLogin ? 'Přihlásit se' : 'Registrovat se')
                  }
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {isLogin ? 'Nemáte účet?' : 'Již máte účet?'}
                  {' '}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="font-medium text-violet-600 hover:text-violet-500 underline"
                  >
                    {isLogin ? 'Registrujte se' : 'Přihlaste se'}
                  </button>
                </p>
              </div>

              <div className="mt-4 text-center">
                <Link 
                  to="/" 
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  ← Zpět na hlavní stránku
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AuthPage;
