import React from "react";
import Modal from "./Modal";

class FormToShowResult extends React.Component {
  constructor(props) {
    super();
    this.state = {
      show: false,
      habits: props.habits
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.setState({ show: true });
  }

  hideModal() {
    this.setState({ show: false });
  }

  render() {
    return (
      <form className="popup">
        <button type="button" onClick={this.showModal}>
          Show results
        </button>
        <Modal
          handleClose={this.hideModal}
          show={this.state.show}
          data={this.state.habits}
        />
      </form>
    );
  }
}

export default FormToShowResult;
