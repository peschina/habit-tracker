import React from "react";
import FancyModal from "./Modal";
import { Button, Form } from "react-bootstrap";

// return Modal, a component that displays a list with all habits and the total time dedicated to each one,
// ordered from the most performed to the least performed
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
