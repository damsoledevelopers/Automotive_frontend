import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, USER_ROLES } from './AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  // Wait a bit longer for auth to initialize on page refresh
  useEffect(() => {
    if (!loading) {
      // Small delay to ensure auth state is fully initialized
      const timer = setTimeout(() => {
        setIsChecking(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Show loading while checking or if auth is loading
  if (loading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Get user role from user object or localStorage fallback
  const userRoleFromStorage = localStorage.getItem('userRole');
  const userRole = user.role || userRoleFromStorage;

  // If specific roles are required, check if user has one of them
  if (allowedRoles.length > 0 && userRole) {
    const normalizedUserRole = userRole.toLowerCase();
    const normalizedAllowedRoles = allowedRoles.map(role => (role || '').toLowerCase());
    const hasAccess = normalizedAllowedRoles.includes(normalizedUserRole);
    
    if (!hasAccess) {
      console.warn('Access denied:', { 
        userRole: user.role, 
        userRoleFromStorage,
        userRoleNormalized: normalizedUserRole,
        allowedRoles, 
        allowedRolesNormalized: normalizedAllowedRoles,
        userObject: user 
      });
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h2>
              <p className="text-gray-600 mb-4">
                You don't have permission to access this page.
                {userRole && (
                  <span className="block mt-2 text-sm">
                    Your role: <strong>{userRole}</strong>
                  </span>
                )}
              </p>
              <a
                href="/"
                className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
              >
                Go to Home
              </a>
            </div>
          </div>
        </div>
      );
    }
  } else if (allowedRoles.length > 0 && !userRole) {
    // User has no role - this shouldn't happen, but handle it gracefully
    console.error('User has no role assigned:', user);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
