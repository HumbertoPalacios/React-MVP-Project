// Goal Form that allows the user to input data
export function GoalForm({ createGoal, handleGoalInput, handleSaveGoal, editGoal }) {
    return (
      <form className="new-item-form">
        <div className="form-row">
          <label htmlFor="goal">New Goal:</label>
          <input type="text" id="goal" value={createGoal} onChange={handleGoalInput}/>
        </div>
        <button type="button" className="btn" onClick={handleSaveGoal}>
          {editGoal ? 'Update Goal' : 'Create Goal'}
        </button>
      </form>
    );
  }