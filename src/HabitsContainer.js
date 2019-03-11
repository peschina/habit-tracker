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
      showResult: false,
      showHabit: false,
      toShow: {}
    };
    this.createLi = this.createLi.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModalResult = this.showModalResult.bind(this);
    this.hideModalResult = this.hideModalResult.bind(this);
    this.showModalHabit = this.showModalHabit.bind(this);
    this.hideModalHabit = this.hideModalHabit.bind(this);
    this.deleteHabit = this.deleteHabit.bind(this);
  }

  // makes modal that displays results visible
  showModalResult() {
    this.setState({ showResult: true });
  }

  // makes modal that displays results hidden
  hideModalResult() {
    this.setState({ showResult: false });
  }

  handleSubmit() {
    //data to post is this.state.toAdd, with totalTime setted as "00:00"
    // id of new habit is set by server
    const value = this.state.toAdd;

    // check that we have a valid name for the new habit
    if (!value) {
      alert("Please write a name for the new habit");
      return;
    }

    // check if an habit with the same name already exists
    let names = this.state.habits.map(item => {
      return item.name;
    });
    let duplicate = names.includes(value);
    let checkLowerCase = names.includes(value.toLowerCase());
    let upperCase = value.charAt(0).toUpperCase() + value.slice(1);
    let checkUpperCase = names.includes(upperCase);
    if (
      duplicate === true ||
      checkLowerCase === true ||
      checkUpperCase === true
    ) {
      alert("This habit already exists");
      this.setState({ toAdd: "" });
      return;
    }

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
    // check if input for instanceTime has value
    if (habit.instanceTime === "00:00") {
      alert("Please type in time dedicated to habit");
      return;
    }
    // convert time strings to minutes
    const strIn = habit.instanceTime.split(":");
    const minutesIns = parseInt(strIn[0], 10) * 60 + parseInt(strIn[1], 10);
    const strTot = habit.totalTime.split(":");
    const minutesTot = parseInt(strTot[0], 10) * 60 + parseInt(strTot[1], 10);
    // sum instanceTime and totalTime, then convert totalTime back to string
    let h = Math.floor((minutesIns + minutesTot) / 60);
    let m = (minutesIns + minutesTot) % 60;
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

  showModalHabit(event) {
    // save id of habit that needs to be displayed
    const id = event.target.getAttribute("data-id");
    const habit = this.state.habits.filter(item => item.id == id)[0];
    this.setState({ toShow: habit });
    // makes modal that displays habit visible
    this.setState({ showHabit: true });
  }

  // makes modal that displays habit hidden
  hideModalHabit() {
    this.setState({ showHabit: false });
  }

  // calls DELETE
  deleteHabit() {
    const habit = this.state.toShow;
    const id = habit.id;
    fetch(`http://localhost:5000/api/habits/${id}`, {
      method: "delete",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        if (response.ok) {
          alert("habit has been deleted");
          let newHabits = [...this.state.habits];
          newHabits = newHabits.filter(item => item !== habit);
          this.setState({ habits: newHabits });
        } else if (response.status === 404) {
          alert("the habit has already been deleted");
        } else {
          console.log(response.json().errors);
        }
      })
      .catch(error => console.log("there is an error", error));
  }

  createLi() {
    // for each habit return a li that displays name (when clicked displays a modal with info on habit),
    // an input for time dedicated to habit that can be added,
    // and a button to trigger the event
    const list = this.state.habits.map(item => {
      const name = item.name;
      const key = item.id;
      return (
        <ListGroup.Item as="li" key={key}>
          <Row>
            <Col>
              <Button
                variant="link"
                className="text-dark"
                block
                data-id={key}
                value={item.name}
                onClick={this.showModalHabit}
              >
                {name}
              </Button>
            </Col>
            <Col>
              <FormControl
                type="time"
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
        showResult={this.state.showResult}
        handleClose={this.hideModalResult}
        showModalResult={this.showModalResult}
        showHabit={this.state.showHabit}
        closeModal={this.hideModalHabit}
        delete={this.deleteHabit}
        habitToShow={this.state.toShow}
      />
    );
  }
}

export default Habits;
