import React from "react";
import { ListGroup, Row, Col } from "react-bootstrap";
import { toMinutes } from "../utils";

function ListResult({ habits }) {
  if (!habits || habits.length === 0) return <div>No habit to show</div>;

  // sort array from habit with more minutes to habit with less minutes
  habits.sort((a, b) => {
    a = toMinutes(a.totalTime);
    b = toMinutes(b.totalTime);
    return a > b ? -1 : a < b ? 1 : 0;
  });

  // return a li that dislays name and totalTime for each habit
  const list = habits.map(item => {
    const { id: key, name, totalTime } = item;
    return (
      <ListGroup.Item key={key}>
        <Row>
          <Col>{name}</Col>
          <Col>{totalTime}</Col>
        </Row>
      </ListGroup.Item>
    );
  });
  return list;
}

export default ListResult;
