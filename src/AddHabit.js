import React from "react";
import { FormControl, Form, Button, Row, Col } from "react-bootstrap";

// creates an input for writing down the habit to be added and a button that triggers the event
function AddHabit(props) {
  return (
    <Form>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <FormControl
            type="text"
            placeholder="New habit"
            value={props.toAdd}
            onChange={props.handleAdd}
          />
        </Col>
        <Col md="auto">
          <Button variant="success" onClick={props.handleSubmit}>
            Add
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default AddHabit;
