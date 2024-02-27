// Goal Item that displays an individual goal from user 
export function GoalItem({ goal, onEdit, onDelete }) {
    return (
      <li>
        <label>
          <input type="checkbox"/>
          {goal.goal}
          <button className="btn btn-info" onClick={() => onEdit(goal.goalid, goal.goal)}>Edit</button>
          <button className="btn btn-danger" onClick={() => onDelete(goal.goalid)}>Delete</button>
        </label>
      </li>
    );
  }