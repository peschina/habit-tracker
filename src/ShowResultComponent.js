import React from "react";
import FancyModal from "./Modal";
import { Button, Form } from "react-bootstrap";

function ShowResultComponent(props) {
  return (
    <Form>
      <Button variant="success" onClick={props.onClick}>
        Show results
      </Button>
      <FancyModal
        handleClose={props.handleClose}
        show={props.show}
        data={props.data}
      />
    </Form>
  );
}

export default ShowResultComponent;
