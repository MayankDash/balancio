// src/components/MainContent.jsx
import React, { useState } from "react";
import DashboardHome from "./features/DashboardHome";
import Bookkeeping from "./features/Bookkeeping";
import TaxCompliance from "./features/TaxCompliance";
import CashFlow from "./features/CashFlow";
import Notifications from "./features/Notifications";
import ExpenseTracking from "./features/ExpenseTracking";
import DataUploader from "./DataUpload";
import Sidebar from "./Sidebar";
import VisualizationSelector from "./VisualizationSelector";
import "../styles/MainContent.css";

const MainContent = () => {
  const [data, setData] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState("dashboard");
  const [selectedChart, setSelectedChart] = useState("bar");

  const handleDataParsed = (parsedData) => {
    setData(parsedData);
  };

  const renderFeature = () => {
    const featureProps = { data, selectedChart };
    switch (selectedFeature) {
      case "bookkeeping":
        return <Bookkeeping {...featureProps} />;
      case "tax":
        return <TaxCompliance {...featureProps} />;
      case "cashflow":
        return <CashFlow {...featureProps} />;
      case "notifications":
        return <Notifications {...featureProps} />;
      case "expenses":
        return <ExpenseTracking {...featureProps} />;
      default:
        return <DashboardHome data={data} />;
    }
  };

  return (
    <div className="main-content">
      <Sidebar setSelectedFeature={setSelectedFeature} />
      <div className="content-container">
        <h1 className="feature-title">
          {selectedFeature === "dashboard"
            ? "Dashboard Overview"
            : selectedFeature === "bookkeeping"
            ? "Bookkeeping"
            : selectedFeature === "tax"
            ? "Tax Compliance"
            : selectedFeature === "cashflow"
            ? "Cash Flow"
            : selectedFeature === "notifications"
            ? "Notifications"
            : "Expense Tracking"}
        </h1>
        <DataUploader onDataParsed={handleDataParsed} />
        {selectedFeature !== "dashboard" && (
          <VisualizationSelector
            selectedChart={selectedChart}
            setSelectedChart={setSelectedChart}
          />
        )}
        <div className="feature-display">{renderFeature()}</div>
      </div>
    </div>
  );
};

export default MainContent;
