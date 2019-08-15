import React from "react";
import { Row, Col } from "react-bootstrap";
import monkey from "./monkey.png";

function Header() {
  return (
    <header>
      <Row className="justify-content-center align-items-center pt-4">
        <Col xs={5}>
          <h1 style={{ color: "forestgreen" }}>Habit Tracker</h1>
        </Col>

        <Col xs={3}>
          <img
            style={{ height: 150 }}
            src={monkey}
            alt="Something wrong with monkey img"
          />
        </Col>
      </Row>
    </header>
  );
}

export default Header;
