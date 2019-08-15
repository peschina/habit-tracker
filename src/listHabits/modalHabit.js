import React from "react";
import { Modal, Button, Row } from "react-bootstrap";

function ModalHabit({ habitToShow, onShow, onDelete, onClose }) {
  const { name, totalTime } = habitToShow;
  return (
    <Modal show={onShow} onHide={onClose}>
      <Modal.Header>
        <Modal.Title className="col-12 text-center">{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="justify-content-center my-3">
          Total time: {totalTime}
        </Row>
        <Row className="justify-content-center py-3">
          <Button
            variant="danger"
            onClick={() => {
              onDelete(habitToShow);
              onClose();
            }}
          >
            Delete
          </Button>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalHabit;
