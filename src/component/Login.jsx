import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { otpService } from "../services/apiService";
import styled from "styled-components";
import { FaEye, FaEyeSlash, FaChevronDown } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

import loginImage from "../assets/img/login-office1.jpg";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, error, getDashboardPath } = useAuth();

  const [loginMethod, setLoginMethod] = useState("username");
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const [localSuccess, setLocalSuccess] = useState("");
  
  // OTP states
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpLoading, setOtpLoading] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    if (otpTimer > 0) {
      timerRef.current = setTimeout(() => {
        setOtpTimer(otpTimer - 1);
      }, 1000);
    } else if (otpTimer === 0 && otpSent) {
      // Timer expired
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [otpTimer, otpSent]);

  useEffect(() => {
    // Reset OTP state when switching login methods
    if (loginMethod === "username") {
      setOtpSent(false);
      setOtp("");
      setOtpTimer(0);
      setLocalError("");
      setLocalSuccess("");
    }
  }, [loginMethod]);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLocalError("");
    setLocalSuccess("");

    if (!mobileNumber || mobileNumber.length !== 10) {
      setLocalError("Please enter a valid 10-digit mobile number");
      return;
    }

    setOtpLoading(true);
    try {
      await otpService.sendOTP(mobileNumber);
      setOtpSent(true);
      setOtpTimer(60); // 1 minute timer
      setLocalSuccess("OTP sent successfully to your mobile number");
      setLocalError("");
    } catch (err) {
      setLocalError(err.message || "Failed to send OTP. Please try again.");
      setOtpSent(false);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLocalError("");
    setLocalSuccess("");

    if (!otp || otp.length !== 6) {
      setLocalError("Please enter a valid 6-digit OTP");
      return;
    }

    setOtpLoading(true);
    try {
      await otpService.verifyOTP(mobileNumber, otp);
      setLocalSuccess("OTP verified successfully!");
      
      // After OTP verification, you can proceed with login
      // For now, we'll just show success. You may want to integrate with your auth system
      // to automatically log in the user or redirect them
      
      // Navigate based on redirect state
      const redirectState = location.state;
      const urlParams = new URLSearchParams(window.location.search);
      const redirectParam = urlParams.get('redirect');
      
      if (redirectState?.action === 'buyNow' && redirectState?.returnTo) {
        navigate(redirectState.returnTo);
        return;
      }
      
      if (redirectParam === 'cart') {
        navigate('/cart');
        return;
      }
      
      if (redirectState?.from) {
        navigate(redirectState.from);
        return;
      }
      
      // Default redirect to home or dashboard
      navigate('/');
    } catch (err) {
      setLocalError(err.message || "Invalid OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLocalError("");
    setLocalSuccess("");

    if (!mobileNumber || mobileNumber.length !== 10) {
      setLocalError("Please enter a valid mobile number");
      return;
    }

    setOtpLoading(true);
    try {
      await otpService.resendOTP(mobileNumber);
      setOtpTimer(60); // Reset timer
      setOtp(""); // Clear OTP input
      setLocalSuccess("OTP resent successfully");
      setLocalError("");
    } catch (err) {
      setLocalError(err.message || "Failed to resend OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLocalError("");
    setLocalSuccess("");

    const identifier = loginMethod === "username" ? username : mobileNumber;

    if (!identifier) {
      setLocalError(`Please enter ${loginMethod === "username" ? "username" : "mobile number"}`);
      return;
    }

    if (loginMethod === "username" && !password) {
      setLocalError("Please enter password");
      return;
    }

    if (loginMethod === "mobile") {
      // If OTP not sent, send OTP
      if (!otpSent) {
        await handleSendOTP(e);
        return;
      }
      // If OTP sent, verify OTP
      if (otpSent) {
        await handleVerifyOTP(e);
        return;
      }
    }

    try {
      const result = await login(identifier, password);
      const user = result.user || result;
      
      const pendingProduct = localStorage.getItem('pendingCartProduct');
      if (pendingProduct) {
        try {
          const product = JSON.parse(pendingProduct);
          const { cartService } = await import('../services/apiService');
          await cartService.addItem({
            productId: product.id,
            name: product.name,
            brand: product.brand,
            imageUrl: product.imageUrl,
            price: product.price,
            discountPrice: product.discountPrice,
            quantity: product.quantity || 1,
            seller: product.seller,
            partNumber: product.partNumber
          });
          localStorage.removeItem('pendingCartProduct');
          navigate('/cart');
          return;
        } catch (error) {
          console.error('Error adding pending product:', error);
          localStorage.removeItem('pendingCartProduct');
        }
      }
      
      const redirectState = location.state;
      const urlParams = new URLSearchParams(window.location.search);
      const redirectParam = urlParams.get('redirect');
      
      if (redirectState?.action === 'buyNow' && redirectState?.returnTo) {
        navigate(redirectState.returnTo);
        return;
      }
      
      if (redirectParam === 'cart') {
        navigate('/cart');
        return;
      }
      
      // Always redirect to role-specific dashboard after login (not to myprofile or previous page)
      const dashboardPath = getDashboardPath(user?.role);
      navigate(dashboardPath);
    } catch (err) {
      setLocalError(err.message || "Login failed. Please check credentials.");
    }
  };

  const displayError = localError || error;

  return (
    <StyledWrapper>
      <div className="login-layout">
        <div className="left-panel">
          <div className="image-overlay">
            <img src={loginImage} alt="Background" className="background-image" />
            <div className=""></div>
          </div>
        </div>

        <div className="right-panel">
          <div className="login-container" data-aos="fade-left">
            <h1 className="title">Login to your Account</h1>

            <div className="login-tabs">
              <button
                className={`tab ${loginMethod === "username" ? "active" : ""}`}
                onClick={() => setLoginMethod("username")}
              >
                Login with Username
              </button>
              <button
                className={`tab ${loginMethod === "mobile" ? "active" : ""}`}
                onClick={() => setLoginMethod("mobile")}
              >
                Login with Mobile Number
              </button>
            </div>

            {displayError && (
              <div className="error-box">
                {displayError}
              </div>
            )}

            {localSuccess && (
              <div className="success-box">
                {localSuccess}
              </div>
            )}

            <form className="login-form" onSubmit={handleLogin}>
              <div className="input-group">
                <label className="input-label">
                  {loginMethod === "username" 
                    ? "Enter your Username" 
                    : otpSent 
                      ? "Enter OTP sent to your mobile" 
                      : "Enter Mobile Number"}
                </label>
                {loginMethod === "mobile" ? (
                  otpSent ? (
                    <div className="otp-input-wrapper">
                      <input
                        type="text"
                        className="input-field otp-input"
                        placeholder="000000"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        required
                        maxLength="6"
                        autoFocus
                      />
                      {otpTimer > 0 && (
                        <div className="otp-timer">
                          Resend OTP in {otpTimer}s
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mobile-input-wrapper">
                      <div className="country-code-selector">
                        <span className="flag-icon">🇮🇳</span>
                        <span className="country-code">+91</span>
                        <FaChevronDown className="dropdown-icon" />
                      </div>
                      <input
                        type="tel"
                        className="input-field mobile-input"
                        placeholder="81234 56789"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        required
                        maxLength="10"
                        disabled={otpLoading}
                      />
                    </div>
                  )
                ) : (
                  <input
                    type="text"
                    className="input-field"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                )}
              </div>

              {loginMethod === "username" && (
                <div className="input-group">
                  <label className="input-label">Enter your Password</label>
                  <div className="password-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input-field"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              )}

              {loginMethod === "mobile" && otpSent && (
                <div className="otp-actions">
                  {otpTimer === 0 ? (
                    <button
                      type="button"
                      className="resend-otp-btn"
                      onClick={handleResendOTP}
                      disabled={otpLoading}
                    >
                      {otpLoading ? "Resending..." : "Resend OTP"}
                    </button>
                  ) : (
                    <div className="otp-timer-text">
                      Didn't receive OTP? Resend in {otpTimer}s
                    </div>
                  )}
                </div>
              )}

              <div className="form-footer">
                <button 
                  className="login-btn" 
                  disabled={loading || otpLoading}
                >
                  {otpLoading 
                    ? "Processing..." 
                    : loading 
                      ? (loginMethod === "mobile" && otpSent ? "Verifying OTP..." : loginMethod === "mobile" ? "Sending OTP..." : "Logging in...") 
                      : (loginMethod === "mobile" && otpSent ? "Verify OTP" : loginMethod === "mobile" ? "Get OTP" : "Login")
                  }
                </button>
                {loginMethod === "username" && (
                  <span
                    className="forgot-password"
                    onClick={() => navigate("/forgot-password")}
                  >
                    Forgot Password
                  </span>
                )}
              </div>
            </form>

            <div className="links-section">
              <p className="register-link">
                Don't have an account?{" "}
                <span onClick={() => navigate("/signup")}>Register here</span>
              </p>
              <p className="verify-link">
                Failed to verify email address after registration?
              </p>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: 
      radial-gradient(circle at 20% 20%, rgba(25, 118, 210, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(156, 39, 176, 0.1) 0%, transparent 50%);
    animation: float 20s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes float {
    0%, 100% {
      transform: translate(0, 0) rotate(0deg);
    }
    50% {
      transform: translate(-20px, -20px) rotate(180deg);
    }
  }

  .login-layout {
    display: flex;
    width: calc(80% - 40px);
    min-height: calc(80vh - 40px);
    position: relative;
    z-index: 1;
    margin: 70px auto;
  }

  .left-panel {
    flex: 1.5;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 5%;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.7);
  }

  .blue-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(25, 118, 210, 0.85) 0%, rgba(21, 101, 192, 0.9) 100%);
    z-index: 2;
  }

  .branding-content {
    position: relative;
    z-index: 3;
    padding: 60px 50px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: white;
  }

  .logo-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .logo-placeholder {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .brand-name {
    font-size: 42px;
    font-weight: 700;
    margin: 0;
    color: #1976d2;
    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7), 0 0 10px rgba(255, 255, 255, 0.3);
    letter-spacing: 1px;
  }

  .brand-tagline {
    font-size: 18px;
    font-weight: 500;
    margin: 0;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.5);
    letter-spacing: 0.5px;
  }

  .features-section {
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
    width: 100%;
  }

  .features-title {
    font-size: 28px;
    font-weight: 700;
    margin: 0;
    color: #1976d2;
    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7), 0 0 10px rgba(255, 255, 255, 0.3);
    letter-spacing: 2px;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    max-width: 500px;
    width: 100%;
    justify-items: center;
  }

  .feature-badge {
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 22px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    transition: transform 0.3s ease, background 0.3s ease;
    width: 100%;
    max-width: 200px;
  }

  .feature-badge:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.25);
  }

  .badge-icon {
    font-size: 36px;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
  }

  .badge-text {
    font-size: 15px;
    font-weight: 600;
    margin: 0;
    text-align: center;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
    letter-spacing: 0.5px;
  }

  .right-panel {
    flex: 1.4;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    padding: 40px;
    position: relative;
  }

  .login-container {
    width: 100%;
    max-width: 450px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .title {
    text-align: center;
    font-size: 28px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .login-tabs {
    display: flex;
    gap: 12px;
    border-radius: 8px;
    overflow: hidden;
  }

  .tab {
    flex: 1;
    padding: 12px 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background: #f5f5f5;
    color: #666;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    outline: none;
  }

  .tab.active {
    background: #1976d2;
    color: white;
    border-color: #1565c0;
  }

  .tab:hover:not(.active) {
    background: #e8e8e8;
  }

  .error-box {
    background: #ffebee;
    color: #c62828;
    padding: 12px;
    border-radius: 8px;
    text-align: center;
    font-size: 14px;
  }

  .success-box {
    background: #e8f5e9;
    color: #2e7d32;
    padding: 12px;
    border-radius: 8px;
    text-align: center;
    font-size: 14px;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .input-label {
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }

  .input-field {
    padding: 12px 16px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s ease;
    background: white;
  }

  .input-field:focus {
    border-color: #1976d2;
  }

  .input-field:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
  }

  .input-field::placeholder {
    color: #999;
  }

  .mobile-input-wrapper {
    display: flex;
    gap: 0;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    background: white;
  }

  .country-code-selector {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 12px 12px;
    background: #f5f5f5;
    border-right: 1px solid #e0e0e0;
    cursor: pointer;
    transition: background 0.3s ease;
    min-width: 100px;
  }

  .country-code-selector:hover {
    background: #e8e8e8;
  }

  .flag-icon {
    font-size: 18px;
    line-height: 1;
  }

  .country-code {
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }

  .dropdown-icon {
    font-size: 10px;
    color: #666;
    margin-left: 2px;
  }

  .mobile-input {
    flex: 1;
    border: none;
    border-radius: 0;
    padding: 12px 16px;
  }

  .mobile-input:focus {
    border: none;
    outline: none;
  }

  .mobile-input-wrapper:focus-within {
    border-color: #1976d2;
  }

  .otp-input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .otp-input {
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 8px;
    padding: 16px;
  }

  .otp-timer {
    text-align: center;
    font-size: 12px;
    color: #666;
    margin-top: 4px;
  }

  .otp-actions {
    display: flex;
    justify-content: center;
    margin-top: -8px;
  }

  .resend-otp-btn {
    background: none;
    border: none;
    color: #1976d2;
    font-size: 14px;
    cursor: pointer;
    text-decoration: underline;
    padding: 8px;
    transition: color 0.3s ease;
  }

  .resend-otp-btn:hover:not(:disabled) {
    color: #1565c0;
  }

  .resend-otp-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .otp-timer-text {
    font-size: 12px;
    color: #666;
    text-align: center;
  }

  .password-wrapper {
    position: relative;
  }

  .password-wrapper .input-field {
    padding-right: 45px;
  }

  .password-toggle {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    transition: color 0.3s ease;
  }

  .password-toggle:hover {
    color: #1976d2;
  }

  .form-footer {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 8px;
  }

  .login-btn {
    flex: 1;
    padding: 12px 24px;
    background: #1976d2;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .login-btn:hover:not(:disabled) {
    background: #1565c0;
  }

  .login-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .forgot-password {
    font-size: 14px;
    color: #666;
    cursor: pointer;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .forgot-password:hover {
    color: #1976d2;
  }

  .links-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }

  .register-link {
    font-size: 14px;
    color: #666;
    margin: 0;
  }

  .register-link span {
    color: #1976d2;
    cursor: pointer;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  .register-link span:hover {
    color: #1565c0;
    text-decoration: underline;
  }

  .verify-link {
    font-size: 14px;
    color: #666;
    margin: 0;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .verify-link:hover {
    color: #1976d2;
  }

  @media (max-width: 1024px) {
    .login-layout {
      flex-direction: column;
    }

    .left-panel {
      flex: 0.4;
      min-height: 300px;
    }

    .right-panel {
      flex: 1;
    }

    .features-grid {
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
    }

    .feature-badge {
      padding: 15px 10px;
    }

    .badge-text {
      font-size: 12px;
    }
  }

  @media (max-width: 768px) {
    .left-panel {
      min-height: 250px;
    }

    .branding-content {
      padding: 30px 20px;
    }

    .brand-name {
      font-size: 32px;
    }

    .brand-tagline {
      font-size: 16px;
    }

    .features-title {
      font-size: 22px;
    }

    .features-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }

    .right-panel {
      padding: 30px 20px;
    }

    .login-container {
      max-width: 100%;
    }

    .title {
      font-size: 24px;
    }

    .tab {
      font-size: 13px;
      padding: 10px 16px;
    }
  }
`;

export default Login;
