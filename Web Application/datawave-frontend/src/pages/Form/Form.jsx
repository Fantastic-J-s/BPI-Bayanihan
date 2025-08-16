import React, { useState } from "react";
import "./form.css";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    goal: "",
    amount: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("✅ Form submitted:", formData);
    alert(`Thanks ${formData.name}, your goal "${formData.goal}" has been saved!`);
  }

  return (
    <div className="form-page">
      <div className="form-container">
        <h2>Bayanihan Ledger – Input Form</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Savings Goal</label>
          <input
            type="text"
            name="goal"
            placeholder="Ex: Emergency Fund"
            value={formData.goal}
            onChange={handleChange}
            required
          />

          <label>Target Amount (₱)</label>
          <input
            type="number"
            name="amount"
            placeholder="5000"
            value={formData.amount}
            onChange={handleChange}
            required
          />

          <button className="btn primary" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
