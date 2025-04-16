import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import CSVVisualizer from "../components/CSVVisualizer";

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
        <MainContent selected={selectedFeature} />
        <CSVVisualizer />
      </div>
    </div>
  );
};

export default Dashboard;
