import React from "react";
import { ListGroup, Row, Col } from "react-bootstrap";

function toMinutes(time) {
  const str = time.split(":");
  const h = parseInt(str[0], 10);
  const m = parseInt(str[1], 10);
  return h * 60 + m;
}

function ListResult(props) {
  const habits = props.habits;

  habits.sort((a, b) => {
    a = toMinutes(a.totalTime);
    b = toMinutes(b.totalTime);
    return a > b ? -1 : a < b ? 1 : 0;
  });

  const list = habits.map(item => {
    const key = habits.indexOf(item);
    return (
      <ListGroup.Item as="li" key={key}>
        <Row>
          <Col>{item.name}</Col>
          <Col>{item.totalTime}</Col>
        </Row>
      </ListGroup.Item>
    );
  });
  return list;
}

export default ListResult;
