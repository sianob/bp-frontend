import { useState } from 'react';
import "./App.css";
import.meta.env.VITE_API_BASE_URL;

const AddTip = () => {
  const [category, setCategory] = useState('Low');
  const [tip, setTip] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081";

      const response = await fetch(`${apiBaseUrl}/bptip`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category, tip }),
      });
      console.log("Response:", response);

      if (response.ok) {
        //const data = await response.json();
        setMessage('✅ Tip added successfully!');
        setTip('');
      } else {
        setMessage('❌ Failed to add tip');
      }
    } catch (err) {
      setMessage('❌ Error adding tip');
      console.error(err);
    }
  };

  return (
    <div>
      <hr />
      <h2>Provide New Tip</h2>
      <p style={{ fontStyle: "italic" }}>Provide a useful tip to help others</p>
      <form onSubmit={handleSubmit}>
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Ideal">Ideal</option>
            <option value="PreHigh">PreHigh</option>
            <option value="High">High</option>
          </select>
        </label>

        <label>
          <textarea
            value={tip}
            onChange={(e) => setTip(e.target.value)}
            rows="2"
            cols="40"
            required
          />
        </label>
        <button type="submit">Add Tip</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddTip;
