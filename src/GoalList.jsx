import { GoalItem } from "./GoalItem"; // Import Goal Item

// Goal List that lists all the goals of the user
export function GoalList({ goals, onEdit, onDelete }) {
    return (
      <ul className="list">
        {goals.map((goal) => (
          <GoalItem key={goal.goalid} goal={goal} onEdit={onEdit} onDelete={onDelete}/>
        ))}
      </ul>
    );
  }