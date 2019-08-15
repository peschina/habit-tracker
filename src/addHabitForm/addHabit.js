import React from "react";
import { FormControl, Form, Button, Row, Col } from "react-bootstrap";

// creates an input for writing down the habit to be added and a button that triggers the event
function AddHabit({ toAdd, onAddHabit, onSubmit }) {
  return (
    <Form>
      <Row className="justify-content-center">
        <Col xs={9} md="auto">
          <FormControl
            type="text"
            placeholder="New habit"
            value={toAdd}
            onChange={onAddHabit}
          />
        </Col>
        <Col xs={3} md="auto">
          <Button variant="success" onClick={onSubmit}>
            Add
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default AddHabit;
