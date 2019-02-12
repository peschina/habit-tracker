import React from "react";
import { FormControl, Form, Button, Row, Col } from "react-bootstrap";

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
