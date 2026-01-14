import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, USER_ROLES } from "../auth/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";
import loginOffice from "../assets/img/login-office1.jpg";
import loginOfficeDark from "../assets/img/login-office-dark.jpeg";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error, getDashboardPath } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!email || !password) {
      setLocalError("Please enter email and password");
      return;
    }

    try {
      const user = await login(email, password);
      // Navigate to appropriate dashboard based on role
      const dashboardPath = getDashboardPath(user.role);
      navigate(dashboardPath);
    } catch (err) {
      setLocalError(err.message || "Login failed. Please check your credentials.");
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 p-2 sm:p-3">
      <div className="flex flex-col md:flex-row w-full max-w-5xl overflow-hidden rounded-lg shadow-xl bg-white">
        {/* Left Image Section */}
        <div className="md:w-1/2 h-40 md:h-auto relative" data-aos="fade-right">
          <img
            aria-hidden="true"
            src={loginOffice}
            alt="Office"
            className="object-cover w-full h-full rounded-l-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent rounded-l-lg"></div>
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-white">
            <h2 className="text-xl sm:text-2xl font-bold">Welcome Back</h2>
            <p className="text-xs sm:text-sm text-gray-200 mt-1">Sign in to access your dashboard</p>
          </div>
        </div>

        {/* Right Form Section */}
        <main className="md:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-white" data-aos="fade-left">
          <div className="w-full max-w-md">
            <h1 className="mb-4 text-2xl sm:text-3xl font-bold text-primary-600">Login</h1>

            {displayError && (
              <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-600 text-xs">
                {displayError}
              </div>
            )}

            <form className="space-y-3" onSubmit={handleLogin}>
              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  className="input-field text-sm py-2"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field text-sm py-2"
                  required
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-1.5 text-sm py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>

              <div className="flex items-center justify-between mt-3">
                <a href="/forgot-password" className="text-xs text-primary-600 hover:underline">
                  Forgot password?
                </a>
                <a href="/signup" className="text-xs text-primary-600 hover:underline">
                  Create account
                </a>
              </div>

              <div className="flex items-center my-4">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-2 text-gray-500 text-xs">or</span>
                <hr className="flex-grow border-gray-300" />
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-1.5">
                <button
                  type="button"
                  disabled
                  className="w-full h-9 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Login With Facebook
                </button>
                <button
                  type="button"
                  disabled
                  className="w-full h-9 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Login With Google
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
