// pages/LoginPage.jsx
import React from "react";
import "../styles/LoginPage.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // You can add real validation/auth here later
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login to Balancio</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
