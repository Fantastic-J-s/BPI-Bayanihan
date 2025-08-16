import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./dashboard2.css";

export default function Dashboard2() {
  // Mock data
  const cashFlowData = [
    { month: "Jan", income: 4000, expense: 2400 },
    { month: "Feb", income: 3000, expense: 1398 },
    { month: "Mar", income: 2000, expense: 9800 },
    { month: "Apr", income: 2780, expense: 3908 },
    { month: "May", income: 1890, expense: 4800 },
    { month: "Jun", income: 2390, expense: 3800 },
    { month: "Jul", income: 3490, expense: 4300 },
  ];

  const savingsData = [
    { name: "Emergency Fund", value: 3000 },
    { name: "Nintendo Switch", value: 1000 },
    { name: "Trip to Singapore", value: 1200 },
  ];

  const COLORS = ["#d32f2f", "#f57c00", "#388e3c"];

  return (
    <div className="dashboard2-container">
      <h1>📊 Financial Dashboard</h1>

      {/* Cash Flow Line Chart */}
      <div className="chart-card">
        <h3>Cash Flow Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={cashFlowData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#388e3c" />
            <Line type="monotone" dataKey="expense" stroke="#d32f2f" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Expense Breakdown (Bar Chart) */}
      <div className="chart-card">
        <h3>Income vs Expenses (Bar Chart)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cashFlowData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#388e3c" />
            <Bar dataKey="expense" fill="#d32f2f" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Savings Goals (Pie Chart) */}
      <div className="chart-card">
        <h3>Savings Goals</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={savingsData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {savingsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
