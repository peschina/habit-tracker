import React from "react";
import ModalHabit from "./modalHabit";
import {
  Container,
  ListGroup,
  Form,
  Col,
  Row,
  Button,
  FormControl
} from "react-bootstrap";

class ListHabits extends React.Component {
  state = {
    show: false,
    selectedHabit: ""
  };

  // store in state habit that needs to be displayed
  handleShow = selectedHabit => {
    this.setState({ selectedHabit, show: true });
  };

  // makes modal that displays habit hidden
  handleHide = () => {
    this.setState({ show: false });
  };

  createLi = () => {
    // for each habit return a li that displays name (when clicked displays a modal with info on habit),
    // an input for time dedicated to habit that can be added, and a button to trigger the event
    const { onChange, onSubmitChange } = this.props;
    const list = this.props.habits.map(item => {
      const { name, instanceTime, id } = item;
      return (
        <ListGroup.Item as="li" key={id}>
          <Row className="d-flex justify-content-center">
            <Col xs={12} md={3}>
              <Button
                className="text-dark"
                variant="link"
                block
                onClick={() => this.handleShow(item)}
              >
                {name}
              </Button>
            </Col>
            <Col xs={8} md={3}>
              <FormControl
                type="time"
                value={instanceTime}
                onChange={e => onChange(e, item)}
              />
            </Col>
            <Col xs={4} md={3}>
              <Button variant="success" onClick={() => onSubmitChange(item)}>
                {" + "}
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
      );
    });
    return list;
  };

  render() {
    const { habits, onDelete } = this.props;
    const { show, selectedHabit } = this.state;
    if (!habits || habits.length === 0)
      return <div style={{ height: "25px" }} />;
    return (
      <Container>
        <Form>
          <ListGroup as="ul">{this.createLi()}</ListGroup>
        </Form>
        <ModalHabit
          onShow={show}
          onClose={this.handleHide}
          onDelete={onDelete}
          habitToShow={selectedHabit}
          habits={habits}
        />
      </Container>
    );
  }
}

export default ListHabits;
