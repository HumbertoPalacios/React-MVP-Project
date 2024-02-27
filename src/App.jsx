import React, { useState, useEffect } from "react"; // Import useState in order for us to create and set state of coponents
import "./styles.css"; // Import styles from our CSS file

// Main App which is rendered on the screen
export default function App() {
  const [getGoals, setGetGoals] = useState([]); // create and initialzie the state for getting goals 
  const [createGoal, setCreateGoal] = useState(""); // create and initialize the state for creating goals
  const [editGoal, setEditGoal] = useState(null); // create and initialize the state for updating goals

  // Function that handles goal input
  const handleGoalInput = (event) => {
    setCreateGoal(event.target.value); // Set the goal to the value of the event 
  };

  // Function that fetches goals when invoked
  const fetchGoals = () => {
    fetch("http://localhost:8001/goals") // Fetch backend API route
      .then((response) => response.json()) // If fetch was successful, respond with json formatted data
      .then((data) => setGetGoals(data)) // And set the state getGoals
      .catch((error) => console.error("Error fetching goals:", error)); // If fetch was unsuccessful, log out error
  };

  // Function that creates or edits goal depending on condition
  const handleSaveGoal = (event) => {
    event.preventDefault(); // Prevent the form from submitting traditionally
      
    // Check if we're in edit mode
    if (editGoal) {
      fetch(`http://localhost:8001/goals/${editGoal}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ goal: createGoal }),
      })
      .then(response => response.json())
      .then(() => {
        setCreateGoal(''); // Clear the input field
        setEditGoal(null); // Exit edit mode
        fetchGoals(); // Refresh the goals list
      })
      .catch(error => console.error('Error:', error));
    } else {
      // Existing logic to create a new goal
      // Create the new goal object to send to the server
      const goalData = {
        goal: createGoal,
      };
  
      // Make a POST request to the server endpoint responsible for creating goals
      fetch('http://localhost:8001/goals', { 
        method: 'POST', // Specify the method
        headers: {
          'Content-Type': 'application/json', // Specify the content type as JSON
        },
        body: JSON.stringify(goalData), // Convert the JavaScript object to a JSON string and sent it to the endpoint 
      })
      .then(response => response.json()) // If fetch was successful, convert the response to JSON
      .then(data => { // With data received
        console.log('Success:', data); // Log it to the console
        setCreateGoal(''); // Reset the input field 
        fetchGoals(); // Invoke fetchGoals to update the list 
      })
      .catch((error) => { // If fetch was unsuccessful
        console.error('Error:', error); // Log out error message
      });
        }
    };
  
    // Function to handle the edit click
    const handleEditClick = (goalId, goal) => {
      setCreateGoal(goal); // Set the goal text to the input field
      setEditGoal(goalId); // Set the current editing goal's ID
    };

  return (
    <>
      <form className="new-item-form">
        <div className="form-row">
          <label htmlFor="goal">New Goal:</label>
          <input type="text" id="goal" value={createGoal} onChange={handleGoalInput}/>
        </div>
        <button type="button" className="btn" onClick={fetchGoals}>Get All Goals</button>
        <button type="button" className="btn" onClick={handleSaveGoal}>
        {editGoal ? 'Update Goal' : 'Create Goal'}
        </button>
      </form>
      <h2>My Goals:</h2>
      <ul className="list">
        {getGoals.map((goal) => (
          <li key={goal.goalid}>
            <label>
              <input type="checkbox"/>
              {goal.goal}
              <button className="btn btn-info" onClick={() => handleEditClick(goal.goalid, goal.goal)}>Edit</button>
              <button className="btn btn-danger">Delete</button>
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}
