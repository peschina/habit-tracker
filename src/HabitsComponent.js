import React from "react";
import FormToShowResult from "./FormToShowResult";
import FormToAddHabit from "./FormToAddHabit";

function HabitsComponent(props) {
  return (
    <div>
      <FormToAddHabit
        handleAdd={props.handleAdd}
        handleSubmit={props.handleSubmit}
        toAdd={props.toAdd}
      />
      <label>
        Habits
        <form>
          <ul>{props.createLi}</ul>
        </form>
      </label>
      <FormToShowResult habits={props.habits} />
    </div>
  );
}

export default HabitsComponent;
