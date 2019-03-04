import React from "react";
import ModalHabit from "./ModalHabit";
import { Container, ListGroup, Form } from "react-bootstrap";

function ListHabits(props) {
  if (props.habits == null || props.habits.length === 0)
    return <div style={{ height: "25px" }} />;
  return (
    <Container>
      <Form>
        {/* createLi returns a li for each habit */}
        <ListGroup as="ul">{props.createLi}</ListGroup>
      </Form>
      <ModalHabit
        showModal={props.showHabit}
        closeModal={props.closeModal}
        delete={props.delete}
        habitToShow={props.habitToShow}
        habits={props.habits}
      />
    </Container>
  );
}

export default ListHabits;
