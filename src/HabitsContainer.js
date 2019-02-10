import React from "react";
import HabitsComponent from "./HabitsComponent";

class Habits extends React.Component {
  constructor() {
    super();
    this.state = {
      habits: [
        { name: "russian", istanceTime: "00:00", totalTime: "02:00" },
        { name: "crochet", istanceTime: "00:00", totalTime: "07:00" },
        { name: "reading", istanceTime: "00:00", totalTime: "04:00" },
        { name: "gym", istanceTime: "00:00", totalTime: "05:00" }
      ],
      loading: false,
      isAdding: false,
      toAdd: ""
    };
    this.createLi = this.createLi.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.setState({ isAdding: true });
  }

  handleAdd(event) {
    const { value } = event.target;
    this.setState({ toAdd: value });
  }

  handleChange(event) {
    const { value } = event.target;
    const newHabits = [...this.state.habits];
    const key = event.target.getAttribute("data-index");
    newHabits[key].istanceTime = value;
    this.setState({ habits: newHabits });
  }

  handleClick(event) {
    const newHabits = [...this.state.habits];
    const key = event.target.getAttribute("index");
    const strIn = newHabits[key].istanceTime.split(":");
    const minutesIns = parseInt(strIn[0], 10) * 60 + parseInt(strIn[1], 10);
    const strTot = newHabits[key].totalTime.split(":");
    const minutesTot = parseInt(strTot[0], 10) * 60 + parseInt(strTot[1], 10);
    var h = Math.floor((minutesIns + minutesTot) / 60);
    var m = (minutesIns + minutesTot) % 60;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    newHabits[key].totalTime = (h + ":" + m).toString();
    this.setState({ habits: newHabits });
  }

  createLi() {
    const list = this.state.habits.map(item => {
      const name = item.name;
      const key = this.state.habits.indexOf(item);
      return (
        <li key={key}>
          {name}
          <input
            type="text"
            data-index={key}
            value={this.state.habits[key].istanceTime}
            onChange={this.handleChange}
          />
          <button
            type="button"
            index={key}
            value="+"
            onClick={this.handleClick}
          >
            {" "}
            +{" "}
          </button>
        </li>
      );
    });
    return list;
  }

  /*{   componentDidMount() {
        this.setState({loading: true});
        fetch("url apina")
        .then(response => {if (response.ok) response.json()
        else throw new Error("something went wrong") })
        // nel caso modificare response
        .then(data => this.setState({habits: data, loading: false}))
        se in data manca l'istanceTime valutare come risettare habits (tenere il vecchio valore di istanceTime usando
        l'arrow function e aggiornare solo gli altri campi?)
        .catch(error => console.log("there is an error"))
    }}*/

  //call post when this.state.isAdding === true
  //data to post is this.state.toAdd, with totalTime as 00:00

  render() {
    return this.state.loading ? (
      "Loading..."
    ) : (
      <HabitsComponent
        handleAdd={this.handleAdd}
        handleSubmit={this.handleSubmit}
        toAdd={this.state.toAdd}
        createLi={this.createLi()}
        habits={[...this.state.habits]}
      />
    );
  }
}

export default Habits;
