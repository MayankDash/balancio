// src/components/MainContent.jsx
import React, { useState } from "react";
import DashboardHome from "./features/DashboardHome";
import Bookkeeping from "./features/Bookkeeping";
import TaxCompliance from "./features/TaxCompliance";
import CashFlow from "./features/CashFlow";
import Notifications from "./features/Notifications";
import ExpenseTracking from "./features/ExpenseTracking";
import DataUpload from "./DataUpload";
import Sidebar from "./Sidebar";
import "../styles/MainContent.css";

const MainContent = () => {
  const [data, setData] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState("dashboard");

  // Function to handle the parsed CSV data
  const handleDataParsed = (parsedData) => {
    setData(parsedData);
  };

  // Render the appropriate feature based on the sidebar selection
  const renderFeature = () => {
    switch (selectedFeature) {
      case "bookkeeping":
        return <Bookkeeping data={data} />;
      case "tax":
        return <TaxCompliance data={data} />;
      case "cashflow":
        return <CashFlow data={data} />;
      case "notifications":
        return <Notifications data={data} />;
      case "expenses":
        return <ExpenseTracking data={data} />;
      default:
        return <DashboardHome data={data} />;
    }
  };

  return (
    <div className="main-content">
      <Sidebar setSelectedFeature={setSelectedFeature} />
      <div className="content-container">
        <DataUpload onDataParsed={handleDataParsed} />
        {renderFeature()}
      </div>
    </div>
  );
};

export default MainContent;
