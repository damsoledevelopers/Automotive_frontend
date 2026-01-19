import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";

import loginImage from "../assets/img/login-office1.jpg";

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
      const dashboardPath = getDashboardPath(user.role);
      navigate(dashboardPath);
    } catch (err) {
      setLocalError(err.message || "Login failed. Please check credentials.");
    }
  };

  const displayError = localError || error;

  return (
    <StyledWrapper>
      <div className="outer-container">

        <div className="login-card" data-aos="zoom-in">

          {/* LEFT IMAGE */}
          <div className="image-section">
            <img src={loginImage} alt="login" />
          </div>

          {/* RIGHT LOGIN FORM */}
          <div className="form-section">

            <h2 className="title">Welcome Back</h2>

            {displayError && (
              <div className="error-box">
                {displayError}
              </div>
            )}

            <form className="form" onSubmit={handleLogin}>

              <input
                type="email"
                placeholder="Email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <p
                className="forgot"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </p>

              <button className="btn" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>

            <p className="signup">
              Don't have an account?
              <span onClick={() => navigate("/signup")}> Sign up</span>
            </p>

          </div>

        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f2f2f2;

  .outer-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .login-card {
    display: flex;
    width: 900px;
    height: 500px;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 15px;
  }

  .image-section {
    width: 50%;
  }

  .image-section img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .form-section {
    width: 50%;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .title {
    text-align: center;
    margin-bottom: 20px;
  }

  .error-box {
    background: #ffebee;
    color: red;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 10px;
    text-align: center;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .input {
    padding: 12px;
    border-radius: 20px;
    border: 1px solid #ccc;
  }

  .forgot {
    text-align: right;
    font-size: 12px;
    cursor: pointer;
  }

  .btn {
    padding: 10px;
    border: none;
    border-radius: 20px;
    background: teal;
    color: white;
    cursor: pointer;
  }

  .signup {
    text-align: center;
    font-size: 12px;
    margin-top: 10px;
  }

  .signup span {
    color: teal;
    cursor: pointer;
  }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .login-card {
      flex-direction: column;
      height: auto;
      width: 90%;
    }

    .image-section {
      width: 100%;
      height: 200px;
    }

    .form-section {
      width: 100%;
    }
  }
`;

export default Login;
