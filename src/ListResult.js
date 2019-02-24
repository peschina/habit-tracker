import React from "react";
import { ListGroup, Row, Col } from "react-bootstrap";

// transforms time from 00:00 string to minutes
function toMinutes(time) {
  const str = time.split(":");
  const h = parseInt(str[0], 10);
  const m = parseInt(str[1], 10);
  return h * 60 + m;
}

function ListResult(props) {
  const habits = props.habits;
  if (habits == null || habits.length === 0) {
    return <div>No habit to show</div>;
  }

  // sort array from habit with more minutes to habit with less minutes
  habits.sort((a, b) => {
    a = toMinutes(a.totalTime);
    b = toMinutes(b.totalTime);
    return a > b ? -1 : a < b ? 1 : 0;
  });

  // return a li that dislays name and totalTime for each habit
  const list = habits.map(item => {
    const key = item.id;
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
