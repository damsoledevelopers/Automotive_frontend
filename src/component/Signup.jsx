import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth, USER_ROLES } from "../auth/AuthContext";
import styled from "styled-components";
import { FaEye, FaEyeSlash, FaChevronDown, FaTimes, FaCheck, FaGoogle, FaFacebook } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

import loginImage from "../assets/img/login-office1.jpg";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, loading, error, getDashboardPath } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
    setFormData(prev => ({
      ...prev,
        [name]: value.replace(/\D/g, '').slice(0, 10)
      }));
    } else {
    setFormData(prev => ({
      ...prev,
        [name]: value
      }));
    }
      setLocalError("");
  };

  const passwordRequirements = {
    lowercase: /[a-z]/.test(formData.password),
    uppercase: /[A-Z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[!@#$%^&*]/.test(formData.password),
    minLength: formData.password.length >= 6
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!formData.email || !formData.phone || !formData.username || !formData.password) {
      setLocalError("Please fill in all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setLocalError("Please enter a valid email address");
      return;
    }

    if (formData.phone.length !== 10) {
      setLocalError("Please enter a valid 10-digit phone number");
      return;
    }


    if (!passwordRequirements.lowercase || !passwordRequirements.uppercase || 
        !passwordRequirements.number || !passwordRequirements.special || !passwordRequirements.minLength) {
      setLocalError("Password does not meet all requirements");
      return;
    }

    try {
      const user = await register(formData.username, formData.email, formData.password, USER_ROLES.CUSTOMER);
      
      const redirectState = location.state;
      if (redirectState?.action === 'buyNow' && redirectState?.returnTo) {
        navigate(redirectState.returnTo);
        return;
      }
      
      const dashboardPath = getDashboardPath(user.role);
      navigate(dashboardPath);
    } catch (err) {
      setLocalError(err.message || "Registration failed. Please try again.");
    }
  };

  const displayError = localError || error;

  return (
    <StyledWrapper>
      <div className="signup-layout">
        <div className="left-panel">
          <div className="image-overlay">
            <img src={loginImage} alt="Background" className="background-image" />
            <div className=""></div>
          </div>
        </div>

        <div className="right-panel">
          <div className="signup-container" data-aos="fade-left">
            <h1 className="title">Create your Account</h1>

            {displayError && (
              <div className="error-box">
                {displayError}
              </div>
            )}

            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label">Enter your Name</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="enter your first and last name"
                  name="text"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Enter your Phone Number</label>
                <div className="mobile-input-wrapper">
                  <div className="country-code-selector">
                    <span className="flag-icon">🇮🇳</span>
                    <span className="country-code">+91</span>
                    <FaChevronDown className="dropdown-icon" />
              </div>
                <input
                    type="tel"
                    className="input-field mobile-input"
                    placeholder="Mobile Number"
                    name="phone"
                    value={formData.phone}
                  onChange={handleChange}
                  required
                    maxLength="10"
                />
              </div>
              </div>

              <div className="input-group">
                <label className="input-label">Enter your email id</label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="Enter your email id"
                  name="email"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Choose a password</label>
                <div className="password-wrapper">
                <input
                    type={showPassword ? "text" : "password"}
                    className="input-field"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
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
                {formData.password && (
                  <div className="password-requirements">
                    <p className="requirements-title">Password must contain the following:</p>
                    <div className="requirements-list">
                      <div className={`requirement-item ${passwordRequirements.lowercase ? 'valid' : ''}`}>
                        {passwordRequirements.lowercase ? <FaCheck /> : <FaTimes />}
                        <span>A lowercase letter</span>
            </div>
                      <div className={`requirement-item ${passwordRequirements.uppercase ? 'valid' : ''}`}>
                        {passwordRequirements.uppercase ? <FaCheck /> : <FaTimes />}
                        <span>An uppercase letter</span>
              </div>
                      <div className={`requirement-item ${passwordRequirements.number ? 'valid' : ''}`}>
                        {passwordRequirements.number ? <FaCheck /> : <FaTimes />}
                        <span>A number</span>
              </div>
                      <div className={`requirement-item ${passwordRequirements.special ? 'valid' : ''}`}>
                        {passwordRequirements.special ? <FaCheck /> : <FaTimes />}
                        <span>A special character (!@#$%^&*)</span>
              </div>
                      <div className={`requirement-item ${passwordRequirements.minLength ? 'valid' : ''}`}>
                        {passwordRequirements.minLength ? <FaCheck /> : <FaTimes />}
                        <span>Minimum 6 characters</span>
              </div>
            </div>
              </div>
            )}
              </div>

              <div className="form-footer">
                <button className="signup-btn" disabled={loading}>
                  {loading ? "Creating Account..." : "Signup"}
                </button>
                <span
                  className="back-to-login"
                  onClick={() => navigate("/login")}
                >
                 Login 
                </span>
              </div>
            </form>

            <div className="social-login">
              <div className="social-icons">
                <button type="button" className="social-icon google-icon">
                  <FaGoogle />
                </button>
                <button type="button" className="social-icon facebook-icon">
                  <FaFacebook />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  height: 100vh;
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

  .signup-layout {
    display: flex;
    width: calc(80%);
    height: calc(80vh);
    position: relative;
    z-index: 1;
    margin: 80px auto;
    overflow: hidden;
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
    left: 0;
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

  .dark-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
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
    justify-content: center;
    align-items: center;
    color: white;
    gap: 60px;
  }

  .logo-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
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
    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7), 0 0 10px rgba(255, 255, 255, 0.3);
    letter-spacing: 1px;
    color: #1976d2;
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
    text-align: center;
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
    background: rgba(0, 0, 0, 0.6);
    border-color: rgba(255, 255, 255, 0.4);
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
    align-items: flex-start;
    justify-content: center;
    background: white;
    padding: 30px 40px 40px 40px;
    position: relative;
    overflow: hidden;
  }

  .right-panel::-webkit-scrollbar {
    display: none;
  }

  .right-panel {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .signup-container {
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 0;
    margin-top: 10px;
  }

  .title {
    text-align: center;
    font-size: 26px;
    font-weight: 600;
    color: #333;
    margin: 0 0 8px 0;
  }

  .error-box {
    background: #ffebee;
    color: #c62828;
    padding: 12px;
    border-radius: 8px;
    text-align: center;
    font-size: 14px;
  }

  .signup-form {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .input-label {
    font-size: 13px;
    font-weight: 500;
    color: #333;
  }

  .input-field {
    padding: 10px 14px;
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

  .password-requirements {
    margin-top: 4px;
    padding: 8px;
    background: #f9f9f9;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
  }

  .requirements-title {
    font-size: 12px;
    font-weight: 600;
    color: #333;
    margin: 0 0 6px 0;
  }

  .requirements-list {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .requirement-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #c62828;
  }

  .requirement-item.valid {
    color: #2e7d32;
  }

  .requirement-item svg {
    font-size: 12px;
  }

  .form-footer {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 2px;
  }

  .signup-btn {
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

  .signup-btn:hover:not(:disabled) {
    background: #1565c0;
  }

  .signup-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .back-to-login {
    font-size: 14px;
    color: #666;
    cursor: pointer;
    text-decoration: none;
    transition: color 0.3s ease;
    white-space: nowrap;
  }

  .back-to-login:hover {
    color: #1976d2;
    text-decoration: underline;
  }

  .social-login {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 12px;
    align-items: center;
  }

  .social-icons {
    display: flex;
    gap: 16px;
    justify-content: center;
  }

  .social-icon {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid #e0e0e0;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 20px;
  }

  .social-icon:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .google-icon {
    color: #db4437;
  }

  .google-icon:hover {
    background: #f5f5f5;
    border-color: #db4437;
  }

  .facebook-icon {
    color: #4267B2;
  }

  .facebook-icon:hover {
    background: #f5f5f5;
    border-color: #4267B2;
  }

  @media (max-width: 1024px) {
    .signup-layout {
      flex-direction: column;
    }

    .left-panel {
      flex: 0.4;
      min-height: 300px;
    }

    .right-panel {
      flex: 1;
      padding: 30px 20px;
    }

    .features-grid {
      grid-template-columns: repeat(4, 1fr);
      gap: 40px;
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

    .signup-container {
      max-width: 100%;
    }

    .title {
      font-size: 24px;
    }

    .form-footer {
      flex-direction: column;
      align-items: stretch;
    }

    .back-to-login {
      text-align: center;
    }
  }
`;

export default Signup;
