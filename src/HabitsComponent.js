import React from "react";
import ShowResult from "./result/showResult";
import AddHabit from "./addHabitForm/addHabit";
import ListHabits from "./listHabits/listHabits";
import { Container } from "react-bootstrap";

// Habits has 3 child components: Add, List and Show
function HabitsComponent({
  toAdd,
  habits,
  onDelete,
  onAddHabit,
  onSubmit,
  onChange,
  onSubmitChange
}) {
  return (
    <Container>
      <Container className="mt-3 mb-3">
        <AddHabit toAdd={toAdd} onAddHabit={onAddHabit} onSubmit={onSubmit} />
      </Container>
      <Container className="text-center">
        <ListHabits
          habits={habits}
          onDelete={onDelete}
          onChange={onChange}
          onSubmitChange={onSubmitChange}
        />
      </Container>
      <Container className="mt-3 mb-3">
        <ShowResult habits={habits} />
      </Container>
    </Container>
  );
}

export default HabitsComponent;
