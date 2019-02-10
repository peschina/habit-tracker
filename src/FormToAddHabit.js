import React from "react";
import { FormControl, Form, Button } from "react-bootstrap";

function FormToAddHabit(props) {
  return (
    <Form>
      <Form.Row>
        <FormControl
          style={{ width: 200, marginRight: 20 }}
          size="sm"
          type="text"
          placeholder="New habit"
          value={props.toAdd}
          onChange={props.handleAdd}
        />
        <Button variant="success" size="sm" onClick={props.handleSubmit}>
          Add
        </Button>
      </Form.Row>
    </Form>
  );
}

export default FormToAddHabit;
