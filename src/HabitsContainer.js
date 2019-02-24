import React from "react";
import HabitsComponent from "./HabitsComponent";
import { ListGroup, Button, FormControl, Row, Col } from "react-bootstrap";

class Habits extends React.Component {
  constructor() {
    super();
    this.state = {
      habits: [],
      loading: false,
      toAdd: "",
      show: false
    };
    this.createLi = this.createLi.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.setState({ show: true });
  }

  hideModal() {
    this.setState({ show: false });
  }

  handleSubmit() {
    //data to post is this.state.toAdd, with totalTime setted as "00:00"
    // id of new habit is set by server
    const value = this.state.toAdd;
    const element = {
      name: value,
      totalTime: "00:00"
    };
    // call POST, response is new habit
    this.setState({ loading: true });
    fetch("http://localhost:5000/api/habits", {
      method: "post",
      body: JSON.stringify(element),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          const e = Response.error();
          console.log(e);
        }
      })
      // add response (new habit) to state
      .then(response => {
        const newHabits = [...this.state.habits, response];
        this.setState({ habits: newHabits });
      })
      .catch(error => console.log("there is an error:", error));
    this.setState({ loading: false, toAdd: "" });
  }

  handleAdd(event) {
    const { value } = event.target;
    // store the input value into state (will need it when POST is called)
    this.setState({ toAdd: value });
  }

  handleChange(event) {
    const { value } = event.target;
    const key = event.target.getAttribute("data-id");
    const habitsUpdated = this.state.habits.map(item => {
      if (item.id == key) {
        item.instanceTime = value;
        return item;
      } else {
        return item;
      }
    });
    this.setState({ habits: habitsUpdated });
  }

  handleClick(event) {
    const newHabits = [...this.state.habits];
    const id = event.target.getAttribute("id");
    // extract current habit from all habits
    let habit = newHabits.filter(item => item.id == id)[0];
    // convert time strings to minutes
    const strIn = habit.instanceTime.split(":");
    const minutesIns = parseInt(strIn[0], 10) * 60 + parseInt(strIn[1], 10);
    const strTot = habit.totalTime.split(":");
    const minutesTot = parseInt(strTot[0], 10) * 60 + parseInt(strTot[1], 10);
    // sum instanceTime and totalTime, then convert totalTime back to string
    var h = Math.floor((minutesIns + minutesTot) / 60);
    var m = (minutesIns + minutesTot) % 60;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    habit.totalTime = (h + ":" + m).toString();
    // reset instanceTime
    habit.instanceTime = "00:00";

    // call PUT to update habit (pass updated totalTime to server)
    this.setState({ loading: true });
    fetch(`http://localhost:5000/api/habits/${id}`, {
      method: "put",
      body: JSON.stringify(habit),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        if (response.ok) {
          // update state with new totalTime and resetted instanceTime
          this.setState({ habits: newHabits, loading: false });
        } else {
          console.log(response.json().errors);
        }
      })
      .catch(error => console.log("there is an error:", error));
  }

  createLi() {
    // for each habit return a li that displays name,
    // an input for time dedicated to habit that can be added and a button to trigger the event
    const list = this.state.habits.map(item => {
      const name = item.name;
      const key = item.id;
      return (
        <ListGroup.Item as="li" key={key}>
          <Row>
            <Col>{name}</Col>
            <Col>
              <FormControl
                type="text"
                data-id={key}
                value={item.instanceTime}
                onChange={this.handleChange}
              />
            </Col>
            <Col>
              <Button
                variant="success"
                id={key}
                value="+"
                onClick={this.handleClick}
              >
                {" "}
                +{" "}
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
      );
    });
    return list;
  }

  componentDidMount() {
    // call GET to update state with all habits
    this.setState({ loading: true });
    fetch("http://localhost:5000/api/habits")
      .then(response => response.json())
      .then(response => {
        this.setState({ habits: response });
      })
      .catch(error => console.log("there is an error: ", error));
    this.setState({ loading: false });
  }

  render() {
    return this.state.loading ? (
      "Loading..."
    ) : (
      <HabitsComponent
        handleAdd={this.handleAdd}
        handleSubmit={this.handleSubmit}
        toAdd={this.state.toAdd}
        createLi={this.createLi()}
        habits={this.state.habits}
        show={this.state.show}
        handleClose={this.hideModal}
        showModal={this.showModal}
      />
    );
  }
}

export default Habits;
