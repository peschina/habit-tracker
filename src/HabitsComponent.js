import React from "react";
import ShowResult from "./ShowResultContainer";
import AddHabit from "./AddHabit";
import ListHabits from "./ListHabits";
import { Container } from "react-bootstrap";

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
        <ListHabits createLi={props.createLi} />
      </Container>
      <Container className="mt-3 mb-3">
        <ShowResult habits={props.habits} />
      </Container>
    </Container>
  );
}

export default HabitsComponent;
