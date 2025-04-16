// src/components/Sidebar.jsx
import React from "react";
import "../styles/Sidebar.css";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ setSelectedFeature }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing tokens, user data, etc.)
    navigate("/"); // Redirect to the landing page
  };
  return (
    <div className="sidebar">
      <div className="logo">Balancio</div>
      <ul className="menu">
        <li onClick={() => setSelectedFeature("dashboard")}>Dashboard</li>
        <li onClick={() => setSelectedFeature("bookkeeping")}>Bookkeeping</li>
        <li onClick={() => setSelectedFeature("tax")}>Tax Compliance</li>
        <li onClick={() => setSelectedFeature("cashflow")}>Cash Flow</li>
        <li onClick={() => setSelectedFeature("notifications")}>
          Notifications
        </li>
        <li onClick={() => setSelectedFeature("expenses")}>Expense Tracking</li>
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Sidebar;
