import React, { Component } from "react";
import ModalResult from "./modalResult";
import { Button, Form } from "react-bootstrap";

class ShowResult extends Component {
  state = { show: false };

  // opens and closes modal that displays results
  toggleModal = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    return (
      <Form>
        <Button variant="success" onClick={this.toggleModal}>
          Show results
        </Button>
        <ModalResult
          onClose={this.toggleModal}
          show={this.state.show}
          habits={this.props.habits}
        />
      </Form>
    );
  }
}

export default ShowResult;
