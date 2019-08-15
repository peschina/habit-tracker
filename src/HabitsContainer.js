import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import HabitsComponent from "./habitsComponent";
import { toMinutes } from "./utils";

class Habits extends React.Component {
  constructor() {
    super();
    this.state = {
      habits: [],
      // value of input for new habit
      toAdd: "",
      loading: false
    };
  }

  componentDidMount() {
    // call GET to update state with all habits
    this.setState({ loading: true });
    fetch("http://localhost:5000/api/habits")
      .then(response => response.json())
      .then(response => {
        this.setState({ habits: response });
      })
      .catch(error =>
        toast.error("The server is disconnected. Try refreshing the page")
      );
    this.setState({ loading: false });
  }

  handleSubmit = () => {
    //data to post is this.state.toAdd, with totalTime setted as "00:00"
    // id of new habit is set by server
    const { toAdd: value, habits } = this.state;

    // check that we have a valid name for the new habit
    if (!value) {
      toast.error("Please write a name for the new habit");
      return;
    }

    // check if an habit with the same name already exists
    let names = habits.map(item => item.name);
    let upperCase = value.charAt(0).toUpperCase() + value.slice(1);
    const duplicate = names.filter(
      name =>
        name === value || name === value.toLowerCase() || name === upperCase
    );
    if (duplicate[0]) {
      toast.error("This habit already exists");
      this.setState({ toAdd: "" });
      return;
    }

    const obj = {
      name: value,
      totalTime: "00:00"
    };

    // call POST, response is new habit
    this.setState({ loading: true });
    fetch("http://localhost:5000/api/habits", {
      method: "post",
      body: JSON.stringify(obj),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          toast.error("Sorry, there is an error");
        }
      })
      // add response (new habit) to state
      .then(response => {
        const newHabits = [...habits, response];
        this.setState({ habits: newHabits });
      })
      .catch(error => toast.error("Sorry, there is an error"));
    this.setState({ loading: false, toAdd: "" });
  };

  handleAdd = e => {
    const { value } = e.target;
    // store the input value into state (will need it when POST is called)
    this.setState({ toAdd: value });
  };

  handleChange = (e, item) => {
    const { value } = e.target;
    const habits = this.state.habits.map(i => {
      if (i.id == item.id) i.instanceTime = value;
      return i;
    });
    this.setState({ habits });
  };

  schema = {
    instanceTime: Joi.string().regex(/^(?!^00:00$)(\d{2})(:{1})(\d{2})/)
  };

  validateProperty = (value, name) => {
    const objToValidate = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(objToValidate, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmitChange = habit => {
    const { instanceTime, totalTime } = habit;
    // check if input for instanceTime has value
    const errorMessage = this.validateProperty(instanceTime, "instanceTime");
    if (errorMessage) {
      toast.error("Please select a valid time");
      return;
    }

    // convert time strings to minutes
    const minutesIns = toMinutes(instanceTime);
    const minutesTot = toMinutes(totalTime);
    // sum instanceTime and totalTime, then convert totalTime back to string
    let h = Math.floor((minutesIns + minutesTot) / 60);
    let m = (minutesIns + minutesTot) % 60;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    habit.totalTime = (h + ":" + m).toString();
    // reset instanceTime
    habit.instanceTime = "00:00";

    // update habits array from state
    const habits = [...this.state.habits];
    habits.splice(habits.indexOf(habit), 1, habit);

    // call PUT to update habit (pass updated totalTime to server)
    this.setState({ loading: true });
    fetch(`http://localhost:5000/api/habits/${habit.id}`, {
      method: "put",
      body: JSON.stringify(habit),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        if (response.ok) {
          // update state with new totalTime and resetted instanceTime
          toast.success("Habit has been updated");
          this.setState({ habits });
        } else {
          toast.error("Sorry, there is an error");
        }
      })
      .catch(error => toast.error("Sorry, there is an error"));
    this.setState({ loading: false });
  };

  // calls DELETE
  handleDelete = habit => {
    fetch(`http://localhost:5000/api/habits/${habit.id}`, {
      method: "delete",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        if (response.ok) {
          toast.success("Habit has been deleted");
          const habits = this.state.habits.filter(item => item !== habit);
          this.setState({ habits });
        } else if (response.status === 404) {
          toast.error("This habit has already been deleted");
        } else {
          toast.error("Sorry, there is an error");
        }
      })
      .catch(error => toast.error("Sorry, there is an error"));
  };

  render() {
    const { loading, habits, toAdd } = this.state;
    return loading ? (
      "Loading..."
    ) : (
      <HabitsComponent
        onAddHabit={this.handleAdd}
        onSubmit={this.handleSubmit}
        toAdd={toAdd}
        habits={habits}
        onToggleModalResult={this.handleToggleModalResult}
        onDelete={this.handleDelete}
        onSubmitChange={this.handleSubmitChange}
        onChange={this.handleChange}
      />
    );
  }
}

export default Habits;
