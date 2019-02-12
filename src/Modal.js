import React from "react";
import ListResult from "./ListResult";
import { Modal, ListGroup, Button } from "react-bootstrap";

function FancyModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "forestgreen" }}>Habits</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          <ListResult habits={props.data} />
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

export default FancyModal;
