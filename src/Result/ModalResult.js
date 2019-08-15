import React from "react";
import ListResult from "./listResult";
import { Modal, ListGroup, Button } from "react-bootstrap";

function ModalResult({ show, habits, onClose }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "forestgreen" }}>Habits</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          <ListResult habits={habits} />
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalResult;
