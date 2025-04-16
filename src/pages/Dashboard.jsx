import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";

const Dashboard = () => {
  const [selectedFeature, setSelectedFeature] = useState("Dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // Redirect to the landing page
  };

  return (
    <div className="dashboard">
      <Sidebar onSelect={setSelectedFeature} />
      <div className="dashboard-content">
        <div className="header">
          <h1>Dashboard Overview</h1>
        </div>
        <div className="content-wrapper">
          <MainContent selected={selectedFeature} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
