
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  isAdmin: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminStatus = async (userEmail: string | undefined) => {
    if (!userEmail) {
      console.log('No user email provided for admin check');
      setIsAdmin(false);
      return;
    }

    console.log('Checking admin status for email:', userEmail);
    
    try {
      // Simple query - RLS is now disabled on app_admins table
      const { data, error } = await supabase
        .from('app_admins')
        .select('user_email')
        .eq('user_email', userEmail)
        .maybeSingle();
      
      console.log('Admin check result:', { data, error });
      
      if (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } else if (data) {
        console.log('User IS admin! Setting admin status to true');
        setIsAdmin(true);
      } else {
        console.log('User is not admin (no record found)');
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Exception checking admin status:', error);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    console.log('AuthProvider: Setting up auth listeners');
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check admin status if user is logged in
        if (session?.user?.email) {
          await checkAdminStatus(session.user.email);
        } else {
          setIsAdmin(false);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user?.email) {
        await checkAdminStatus(session.user.email);
      }
      
      setLoading(false);
    });

    return () => {
      console.log('AuthProvider: Cleaning up auth listeners');
      subscription.unsubscribe();
    };
  }, []);

  // Add debugging for state changes
  useEffect(() => {
    console.log('Auth state updated:', {
      user: user?.email,
      loading,
      isAdmin,
      timestamp: new Date().toISOString()
    });
  }, [user, loading, isAdmin]);

  return (
    <AuthContext.Provider value={{ user, session, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
