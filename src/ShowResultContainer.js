import React from "react";
import ShowResultComponent from "./ShowResultComponent";

class ShowResult extends React.Component {
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
      <ShowResultComponent
        onClick={this.showModal}
        handleClose={this.hideModal}
        show={this.state.show}
        data={this.state.habits}
      />
    );
  }
}

export default ShowResult;
