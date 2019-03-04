import React from "react";
import ListResult from "./ListResult";
import { Modal, ListGroup, Button } from "react-bootstrap";

function ModalResult(props) {
  return (
    <Modal show={props.showResult} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "forestgreen" }}>Habits</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          <ListResult habits={props.habits} />
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalResult;
