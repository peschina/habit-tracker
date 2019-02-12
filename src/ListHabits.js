import React from "react";
import { ListGroup, Form } from "react-bootstrap";

function ListHabits(props) {
  return (
    <Form>
      <ListGroup as="ul">{props.createLi}</ListGroup>
    </Form>
  );
}

export default ListHabits;
