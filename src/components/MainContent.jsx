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
import AIAssistant from './features/AIAssistant';

const MainContent = () => {
  const [data, setData] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [selectedChart, setSelectedChart] = useState("bar");

  const handleDataParsed = (parsedData) => {
    setData(parsedData);
    setSelectedFeature("dashboard"); // Automatically switch to dashboard after upload
  };

  const renderFeature = () => {
    const featureProps = {
      data,
      selectedChart,
      setSelectedChart
    };

    // Only show upload section if no data
    if (data.length === 0) {
      return (
        <div className="upload-section">
          <DataUploader onDataParsed={handleDataParsed} />
        </div>
      );
    }

    switch (selectedFeature) {
      case "dashboard":
        return <DashboardHome data={data} />;
      case "bookkeeping":
        return (
          <div className="feature-display">
            <VisualizationSelector selectedChart={selectedChart} setSelectedChart={setSelectedChart} />
            <Bookkeeping {...featureProps} />
          </div>
        );
      case "tax":
        return (
          <div className="feature-display">
            <VisualizationSelector selectedChart={selectedChart} setSelectedChart={setSelectedChart} />
            <TaxCompliance {...featureProps} />
          </div>
        );
      case "cashflow":
        return (
          <div className="feature-display">
            <VisualizationSelector selectedChart={selectedChart} setSelectedChart={setSelectedChart} />
            <CashFlow {...featureProps} />
          </div>
        );
      case "notifications":
        return (
          <div className="feature-display">
            <VisualizationSelector selectedChart={selectedChart} setSelectedChart={setSelectedChart} />
            <Notifications {...featureProps} />
          </div>
        );
      case "expenses":
        return (
          <div className="feature-display">
            <VisualizationSelector selectedChart={selectedChart} setSelectedChart={setSelectedChart} />
            <ExpenseTracking {...featureProps} />
          </div>
        );
      case "aiassistant":
        return <AIAssistant />;
      default:
        return <DashboardHome data={data} />;
    }
  };

  return (
    <div className="main-content">
      <Sidebar setSelectedFeature={setSelectedFeature} />
      <div className="content-container">
        {data.length === 0 ? (
          <div className="welcome-message">
            <h1>Welcome to Balancio</h1>
            <p>Please upload your financial data to get started</p>
            <DataUploader onDataParsed={handleDataParsed} />
          </div>
        ) : (
          <>
            <h1 className="feature-title">
              {selectedFeature === "dashboard"
                ? "Dashboard Overview"
                : selectedFeature === "bookkeeping"
                ? "Bookkeeping"
                : selectedFeature === "tax"
                ? "Tax Compliance"
                : selectedFeature === "cashflow"
                ? "Cash Flow"
                : selectedFeature === "expenses"
                ? "Expense Tracking"
                : "BalanceGPT Assistant"}
            </h1>
            {renderFeature()}
          </>
        )}
      </div>
    </div>
  );
};

export default MainContent;
