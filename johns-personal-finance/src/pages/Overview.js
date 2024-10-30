// src/pages/Overview.js
import React from 'react';
import './Overview.css';

const Overview = () => {
  return (
    <div className="overview">
      <div className="total-expenses">
        <h2>Total Expenses</h2>
        <p className="expense-amount">$3,829.99</p>
        <p className="expense-month">October 2024</p>
      </div>
      <div className="key-insights">
        <div className="insight">
          <p>Costliest Expense</p>
          <p className="insight-amount">$2,000</p>
          <p className="insight-category">Car Payment</p>
        </div>
        <div className="insight">
          <p>Dominant Category</p>
          <p className="insight-amount">$2,000</p>
          <p className="insight-category">Debt Repayment</p>
        </div>
        <div className="insight">
          <p>Minimal Category</p>
          <p className="insight-amount">$19.99</p>
          <p className="insight-category">Entertainment & Leisure</p>
        </div>
      </div>
      <div className="expense-chart">
        {/* Placeholder for chart - we'll add this in a later step */}
        <p>Expense Distribution Chart (Placeholder)</p>
      </div>
    </div>
  );
};

export default Overview;

