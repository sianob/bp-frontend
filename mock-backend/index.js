const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const SYSTOLIC_MIN = 70;
const SYSTOLIC_MAX = 190;
const DIASTOLIC_MIN = 40;
const DIASTOLIC_MAX = 100;

function isValidInput(s, d) {
  return (
    typeof s === "number" &&
    typeof d === "number" &&
    s >= SYSTOLIC_MIN &&
    s <= SYSTOLIC_MAX &&
    d >= DIASTOLIC_MIN &&
    d <= DIASTOLIC_MAX
  );
}

function classifyBP(systolic, diastolic) {
    if (systolic < 90 && diastolic < 60) {
      return "Low";
    } else if (systolic < 120 && diastolic < 80) {
      return "Ideal";
    } else if (systolic < 140 && diastolic < 90) {
      return "PreHigh";
    } else {
      return "High";
    }
  }
  

app.post('/getbpcategory', (req, res) => {
  const { systolic, diastolic } = req.body;
  if (!isValidInput(systolic, diastolic)) {
    return res
      .status(400)
      .json({ error: "Invalid input values. Please check the range." });
  }
  if (typeof systolic !== 'number' || typeof diastolic !== 'number') {
    return res.status(400).json({ error: "Invalid input" });
  }

  const category = classifyBP(systolic, diastolic);
  res.json({ category });
});

app.listen(8000, () => {
  console.log('Mock API running on http://localhost:8000');
});
