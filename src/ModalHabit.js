import React from "react";
import { Modal, Button, Row } from "react-bootstrap";

function ModalHabit(props) {
  let habit = props.habitToShow;
  return (
    <Modal show={props.showModal} onHide={props.closeModal}>
      <Modal.Header>
        <Modal.Title className="col-12 text-center">{habit.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="justify-content-md-center mt-3 mb-3">
          Total time: {habit.totalTime}
        </Row>
        <Row className="justify-content-md-center">
          <Button variant="danger" className="mt-3 mb-3" onClick={props.delete}>
            Delete
          </Button>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.closeModal}>
          close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalHabit;
