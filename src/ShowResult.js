import React from "react";
import ModalResult from "./ModalResult";
import { Button, Form } from "react-bootstrap";

function ShowResult(props) {
  return (
    <Form>
      <Button variant="success" onClick={props.onClick}>
        Show results
      </Button>
      <ModalResult
        handleClose={props.handleClose}
        showResult={props.showResult}
        habits={props.habits}
      />
    </Form>
  );
}

export default ShowResult;
