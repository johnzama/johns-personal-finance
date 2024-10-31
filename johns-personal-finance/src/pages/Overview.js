// src/pages/Overview.js
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import './Overview.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Overview = () => {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [budgets, setBudgets] = useState({});
  const [spendingAlerts, setSpendingAlerts] = useState([]); // Track alerts
  const [costliestExpense, setCostliestExpense] = useState({});
  const [dominantCategory, setDominantCategory] = useState('');
  const [minimalCategory, setMinimalCategory] = useState('');

  const SPENDING_THRESHOLD = 0.8; // 80% of budget limit

  // Function to add a new expense
  const addExpense = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  // Function to set a budget for a category
  const onSetBudget = (category, amount) => {
    setBudgets((prevBudgets) => ({
      ...prevBudgets,
      [category]: amount,
    }));
  };

  // Calculate total expenses and key insights
  useEffect(() => {
    const newTotal = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setTotal(newTotal);

    const maxExpense = expenses.reduce((max, expense) => (expense.amount > (max.amount || 0) ? expense : max), {});
    setCostliestExpense(maxExpense);

    const categorySums = expenses.reduce((sums, expense) => {
      sums[expense.category] = (sums[expense.category] || 0) + expense.amount;
      return sums;
    }, {});

    const sortedCategories = Object.entries(categorySums).sort((a, b) => b[1] - a[1]);
    setDominantCategory(sortedCategories[0] ? `${sortedCategories[0][1]} - ${sortedCategories[0][0]}` : 'N/A');
    setMinimalCategory(sortedCategories[sortedCategories.length - 1] ? `${sortedCategories[sortedCategories.length - 1][1]} - ${sortedCategories[sortedCategories.length - 1][0]}` : 'N/A');

    // Check for spending alerts based on threshold
    const newAlerts = [];
    Object.keys(budgets).forEach((category) => {
      const totalInCategory = categorySums[category] || 0;
      const budgetLimit = budgets[category];
      if (budgetLimit && totalInCategory >= budgetLimit * SPENDING_THRESHOLD) {
        newAlerts.push({
          category,
          message: `Warning: Spending in ${category} has reached ${((totalInCategory / budgetLimit) * 100).toFixed(0)}% of the budget!`,
        });
      }
    });
    setSpendingAlerts(newAlerts);
  }, [expenses, budgets]);

  // Prepare chart data
  const chartData = {
    labels: expenses.map((expense) => expense.date),
    datasets: [
      {
        label: 'Expenses',
        data: expenses.map((expense) => expense.amount),
        backgroundColor: '#ff5370',
        borderColor: '#ff5370',
        borderWidth: 1,
      },
    ],
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      layout: {
        padding: {
          top: 10,
          bottom: 10,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 200, // Adjust based on data range
          },
          grid: {
            display: true,
            drawBorder: false,
            color: "rgba(200, 200, 200, 0.2)",
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  };

  return (
    <div className="overview">
      <div className="total-expenses">
        <h2>Total Expenses</h2>
        <p className="expense-amount">${total.toFixed(2)}</p>
        <p className="expense-month">October 2024</p>
      </div>

      {/* Display Spending Alerts */}
      {spendingAlerts.length > 0 && (
        <div className="spending-alerts">
          {spendingAlerts.map((alert, index) => (
            <p key={index} className="alert-message">{alert.message}</p>
          ))}
        </div>
      )}

      <div className="key-insights">
        <div className="insight">
          <p>Costliest Expense</p>
          <p className="insight-amount">${costliestExpense.amount || 0}</p>
          <p className="insight-category">{costliestExpense.description || 'N/A'}</p>
        </div>
        <div className="insight">
          <p>Dominant Category</p>
          <p className="insight-amount">{dominantCategory}</p>
        </div>
        <div className="insight">
          <p>Minimal Category</p>
          <p className="insight-amount">{minimalCategory}</p>
        </div>
      </div>
      <div className="expense-chart">
        <h3>Expense Distribution</h3>
        <Bar data={chartData} options={chartData.options} />
      </div>
      <BudgetForm onSetBudget={onSetBudget} />
      <div className="budget-section">
        <h3>Monthly Budgets</h3>
        {Object.keys(budgets).map((category) => {
          const totalInCategory = expenses
            .filter((expense) => expense.category === category)
            .reduce((sum, expense) => sum + expense.amount, 0);
          const progress = Math.min((totalInCategory / budgets[category]) * 100, 100);

          return (
            <div key={category} className="budget-item">
              <p>{category}: ${totalInCategory.toFixed(2)} / ${budgets[category]}</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
              </div>
              {progress === 100 && (
                <p className="alert">Budget exceeded for {category}!</p>
              )}
            </div>
          );
        })}
      </div>
      <ExpenseForm onAddExpense={addExpense} />
    </div>
  );
};

const ExpenseForm = ({ onAddExpense }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString().split('T')[0],
    };
    onAddExpense(newExpense);
    setAmount('');
    setCategory('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Add Expense</button>
    </form>
  );
};

const BudgetForm = ({ onSetBudget }) => {
  const [category, setCategory] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    if (category && budgetAmount) {
      onSetBudget(category, parseFloat(budgetAmount));
      setCategory('');
      setBudgetAmount('');
    }
  };

  return (
    <form onSubmit={handleBudgetSubmit} className="budget-form">
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Budget Amount"
        value={budgetAmount}
        onChange={(e) => setBudgetAmount(e.target.value)}
        required
      />
      <button type="submit">Set Budget</button>
    </form>
  );
};

export default Overview;

