
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
    console.log('=== checkAdminStatus called ===');
    console.log('userEmail:', userEmail);
    console.log('current loading state:', loading);
    console.log('current isAdmin state:', isAdmin);
    
    if (!userEmail) {
      console.log('No user email provided for admin check');
      setIsAdmin(false);
      setLoading(false);
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
      
      console.log('Admin check result:', { data, error, userEmail });
      
      if (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } else if (data) {
        console.log('User IS admin! Setting admin status to true. Data:', data);
        setIsAdmin(true);
      } else {
        console.log('User is not admin (no record found). Data:', data);
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Exception checking admin status:', error);
      setIsAdmin(false);
    } finally {
      console.log('Admin check completed, setting loading to false. Final isAdmin:', isAdmin);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('AuthProvider: Starting auth initialization');
    
    const initializeAuth = async () => {
      try {
        // Check current session first
        console.log('Getting current session...');
        
        // Add timeout to prevent hanging
        const sessionPromise = supabase.auth.getSession();
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Session timeout')), 5000);
        });
        
        const { data: { session }, error } = await Promise.race([sessionPromise, timeoutPromise]) as any;
        
        console.log('Session result:', { session: session?.user?.email || 'No session', error });
        
        if (error) {
          console.error('Error getting session:', error);
          setLoading(false);
          return;
        }
        
        console.log('Current session:', session?.user?.email || 'No session');
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user?.email) {
          console.log('User found, checking admin status...');
          await checkAdminStatus(session.user.email);
        } else {
          console.log('No user found, setting loading to false');
          setIsAdmin(false);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error in auth initialization:', error);
        setLoading(false);
      }
    };
    
    // Set up auth state listener
    console.log('Setting up auth state listener...');
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('=== Auth state change event ===', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user?.email) {
          await checkAdminStatus(session.user.email);
        } else {
          setIsAdmin(false);
          setLoading(false);
        }
      }
    );

    // Initialize auth
    initializeAuth();

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
