/**
 * App.jsx - Integration Example
 * 
 * This is a partial example showing how to integrate the new authentication
 * and user management components into your existing App.jsx
 * 
 * Key additions:
 * 1. Import AuthProvider from auth/AuthContext
 * 2. Wrap your app with AuthProvider
 * 3. Add new routes for Login, Register, Profile, and Users Management
 * 4. Use ProtectedRoute for protected endpoints
 * 5. Replace existing Login/Signup if they exist
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import './App.css';

// Context Providers
import { CartProvider } from './contexts/CartContext';
import { VehicleProvider } from './contexts/VehicleContext';
import { JobProvider } from './contexts/JobContext';
import { EscrowProvider } from './contexts/EscrowContext';

// Auth
import { AuthProvider, USER_ROLES } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';

// UI Components
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// New Integrated Components
import LoginIntegrated from './component/LoginIntegrated';
import RegisterIntegrated from './component/RegisterIntegrated';
import UserProfileIntegrated from './component/UserProfileIntegrated';
import UsersListIntegrated from './component/UsersListIntegrated';

// Existing Components
import Header from './component/Header';
import Footer from "./component/Footer";
import BottomNavigation from './component/BottomNavigation';
// ... rest of your existing imports

function AppRoutes() {
  return (
    <Routes>
      {/* ============================================ */}
      {/* AUTHENTICATION ROUTES (Public) */}
      {/* ============================================ */}
      <Route path="/login" element={<LoginIntegrated />} />
      <Route path="/register" element={<RegisterIntegrated />} />

      {/* ============================================ */}
      {/* USER PROFILE ROUTES (Protected) */}
      {/* ============================================ */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserProfileIntegrated />
          </ProtectedRoute>
        }
      />

      {/* ============================================ */}
      {/* ADMIN ROUTES (Role-Based Protected) */}
      {/* ============================================ */}
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.SUPER_ADMIN]}>
            <UsersListIntegrated />
          </ProtectedRoute>
        }
      />

      {/* ============================================ */}
      {/* EXISTING ROUTES - Keep Your Current Routes */}
      {/* ============================================ */}
      {/* 
        Place all your existing routes here
        Example:
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        etc...
      */}
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <VehicleProvider>
          <JobProvider>
            <EscrowProvider>
              <Router>
                <Header />
                <AppRoutes />
                <BottomNavigation />
                <Footer />
                <ToastContainer
                  position="bottom-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={true}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
              </Router>
            </EscrowProvider>
          </JobProvider>
        </VehicleProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
