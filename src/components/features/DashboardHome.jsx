// src/features/DashboardHome.jsx
import React from "react";

const DashboardHome = ({ data }) => {
  const totalIncome = data.reduce((sum, row) => {
    const income = parseFloat(row.Income || 0);
    return sum + (isNaN(income) ? 0 : income);
  }, 0);

  const totalExpense = data.reduce((sum, row) => {
    const expense = parseFloat(row.Expense || 0);
    return sum + (isNaN(expense) ? 0 : expense);
  }, 0);

  return (
    <div>
      <h2>Dashboard Overview</h2>
      <p>
        <strong>Total Income:</strong> ₹{totalIncome.toFixed(2)}
      </p>
      <p>
        <strong>Total Expenses:</strong> ₹{totalExpense.toFixed(2)}
      </p>
      <p>
        <strong>Net:</strong> ₹{(totalIncome - totalExpense).toFixed(2)}
      </p>
    </div>
  );
};

export default DashboardHome;
