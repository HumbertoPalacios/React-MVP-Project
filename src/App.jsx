import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");

  const fetchGoals = () => {
    // Assuming your backend API is running on localhost:8001
    fetch("http://localhost:8001/goals")
      .then((response) => response.json())
      .then((data) => setGoals(data))
      .catch((error) => console.error("Error fetching goals:", error));
  };

  const handleNewGoalChange = (event) => {
    setNewGoal(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form from actually submitting
    console.log(newGoal); // You can implement goal creation logic here
  };

  return (
    <>
      <form className="new-item-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="goal">New Goal:</label>
          <input type="text" id="goal" value={newGoal} onChange={handleNewGoalChange}/>
        </div>
        <button type="button" className="btn" onClick={fetchGoals}>Get All Goals</button>
      </form>
      <h2>My Goals:</h2>
      <ul className="list">
        {goals.map((goal) => (
          <li key={goal.goalId}>
            <label>
              <input type="checkbox"/>
              {goal.goal}
              <button className="btn btn-danger">Delete</button>
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}
