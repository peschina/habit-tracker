import React from "react";
import ShowResult from "./ShowResult";
import AddHabit from "./AddHabit";
import ListHabits from "./ListHabits";
import { Container } from "react-bootstrap";

// Habits has 3 child components: Add, List and Show
function HabitsComponent(props) {
  return (
    <Container>
      <Container className="mt-3 mb-3">
        <AddHabit
          handleAdd={props.handleAdd}
          handleSubmit={props.handleSubmit}
          toAdd={props.toAdd}
        />
      </Container>
      <Container className="text-center">
        <ListHabits createLi={props.createLi} habits={props.habits} />
      </Container>
      <Container className="mt-3 mb-3">
        <ShowResult
          habits={props.habits}
          handleClose={props.handleClose}
          show={props.show}
          onClick={props.showModal}
        />
      </Container>
    </Container>
  );
}

export default HabitsComponent;
