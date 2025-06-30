
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { user, loading, isAdmin } = useAuth();

  console.log('ProtectedRoute debug:', {
    user: user?.email,
    loading,
    isAdmin,
    requireAdmin,
    timestamp: new Date().toISOString()
  });

  if (loading) {
    console.log('ProtectedRoute: Still loading auth state');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg">Načítání...</p>
          <p className="text-sm text-gray-500 mt-2">Ověřování přístupu...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('No user, redirecting to /auth');
    return <Navigate to="/auth" replace />;
  }

  if (requireAdmin && !isAdmin) {
    console.log('Admin required but user is not admin. User:', user.email, 'isAdmin:', isAdmin);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Přístup odepřen</h1>
          <p className="text-gray-600">Nemáte oprávnění k přístupu na tuto stránku.</p>
          <p className="text-sm text-gray-500 mt-2">Debug: Email: {user.email}, Admin: {isAdmin ? 'Ano' : 'Ne'}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Zkusit znovu načíst
          </button>
        </div>
      </div>
    );
  }

  console.log('Access granted to', user.email, 'Admin status:', isAdmin);
  return <>{children}</>;
};

export default ProtectedRoute;
