import React from "react";
import { ListGroup, Form } from "react-bootstrap";

function ListHabits(props) {
  if (props.habits == null || props.habits.length === 0) return null;
  return (
    <Form>
      {/* createLi returns a li for each habit */}
      <ListGroup as="ul">{props.createLi}</ListGroup>
    </Form>
  );
}

export default ListHabits;
