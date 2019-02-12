import React from "react";
import { Row, Col } from "react-bootstrap";

function Header() {
  return (
    <header>
      <Row className="justify-content-center">
        <Col xs={4} className="pt-4">
          <h1 style={{ color: "forestgreen" }}>My Habit Tracker</h1>
        </Col>

        <Col xs={3}>
          <img
            style={{ height: 150 }}
            src="https://st2.depositphotos.com/4216129/11757/v/950/depositphotos_117570096-stock-illustration-monkey-in-orange-warm-coat.jpg"
            alt="Something wrong with monkey img"
          />
        </Col>
      </Row>
    </header>
  );
}

export default Header;
