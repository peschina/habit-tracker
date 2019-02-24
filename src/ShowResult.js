import React from "react";
import FancyModal from "./Modal";
import { Button, Form } from "react-bootstrap";

function ShowResult(props) {
  return (
    <Form>
      <Button variant="success" onClick={props.onClick}>
        Show results
      </Button>
      <FancyModal
        handleClose={props.handleClose}
        show={props.show}
        habits={props.habits}
      />
    </Form>
  );
}

export default ShowResult;
