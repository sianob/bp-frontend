import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();
    const s = parseInt(systolic, 10);
    const d = parseInt(diastolic, 10);
    if (
      isNaN(s) || isNaN(d) ||
      s < 70 || s > 190 ||
      d < 40 || d > 100
    ) {
      setCategory("Please enter valid numbers.");
      return;
    }
  
    try {
      console.log("Sending request to server...");
      const apiBaseUrl = window._env_?.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE_URL;
      console.log("API Base URL:", apiBaseUrl);

      //const response = await fetch("/getbpcategory", {
      const response = await fetch(`${apiBaseUrl}/getbpcategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ systolic: s, diastolic: d }),
      });

      const data = await response.json();
      if (response.ok) {
        setCategory(data.category);
      } else {
        setCategory(data.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setCategory("Network error.");
    }
  };

  return (
    <div className="container">
      <h1>Blood Pressure Calculator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="systolic">Systolic Pressure</label>
          <input
            type="number"
            id="systolic"
            placeholder="e.g. 120"
            min="70"
            max="190"
            value={systolic}
            onChange={(e) => setSystolic(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <label htmlFor="diastolic">Diastolic Pressure</label>
          <input
            type="number"
            id="diastolic"
            placeholder="e.g. 80"
            min="40"
            max="100"
            value={diastolic}
            onChange={(e) => setDiastolic(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
      {category && <div className="result">Result: {category}</div>}
    </div>
  );
}
