// src/components/Sidebar.jsx
import React from "react";
import "../styles/Sidebar.css";
import { useNavigate } from "react-router-dom";
import {
  Home,
  BookOpen,
  DollarSign,
  TrendingUp,
  CreditCard,
  MessageCircle,
  LogOut
} from "react-feather"; // Removed Bell icon

const Sidebar = ({ setSelectedFeature }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="logo">Balancio</div>
      <button onClick={() => setSelectedFeature("dashboard")}>
        <Home size={20} />
        <span>Dashboard</span>
      </button>
      <button onClick={() => setSelectedFeature("bookkeeping")}>
        <BookOpen size={20} />
        <span>Bookkeeping</span>
      </button>
      <button onClick={() => setSelectedFeature("tax")}>
        <DollarSign size={20} />
        <span>Tax Compliance</span>
      </button>
      <button onClick={() => setSelectedFeature("cashflow")}>
        <TrendingUp size={20} />
        <span>Cash Flow</span>
      </button>
      <button onClick={() => setSelectedFeature("expenses")}>
        <CreditCard size={20} />
        <span>Expense Tracking</span>
      </button>
      <button onClick={() => setSelectedFeature("aiassistant")}>
        <MessageCircle size={20} />
        <span>BalanceGPT</span>
      </button>
      <button onClick={handleLogout}>
        <LogOut size={20} /> {/* Logout icon */}
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
