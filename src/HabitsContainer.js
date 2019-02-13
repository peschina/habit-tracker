import React from "react";
import HabitsComponent from "./HabitsComponent";
import { ListGroup, Button, FormControl, Row, Col } from "react-bootstrap";

class Habits extends React.Component {
  constructor() {
    super();
    this.state = {
      habits: [
        { id: 0, name: "russian", istanceTime: "00:00", totalTime: "02:00" },
        { id: 1, name: "crochet", istanceTime: "00:00", totalTime: "07:00" },
        { id: 2, name: "reading", istanceTime: "00:00", totalTime: "04:00" },
        { id: 3, name: "gym", istanceTime: "00:00", totalTime: "05:00" }
      ],
      loading: false,
      isAdding: false,
      toAdd: "",
      shouldUpdate: { update: false, id: null }
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
    const key = event.target.getAttribute("data-id");
    const habitsUpdated = this.state.habits.map(item => {
      if (item.id == key) {
        item.istanceTime = value;
        return item;
      } else {
        return item;
      }
    });
    console.log(habitsUpdated);
    this.setState({ habits: habitsUpdated });
  }

  handleClick(event) {
    const newHabits = [...this.state.habits];
    const id = event.target.getAttribute("id");
    let habit = newHabits.filter(item => item.id == id);
    const strIn = habit[0].istanceTime.split(":");
    const minutesIns = parseInt(strIn[0], 10) * 60 + parseInt(strIn[1], 10);
    const strTot = habit[0].totalTime.split(":");
    const minutesTot = parseInt(strTot[0], 10) * 60 + parseInt(strTot[1], 10);
    var h = Math.floor((minutesIns + minutesTot) / 60);
    var m = (minutesIns + minutesTot) % 60;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    habit[0].totalTime = (h + ":" + m).toString();
    this.setState({
      habits: newHabits,
      shouldUpdate: {
        update: true,
        id: id
      }
    });
  }

  createLi() {
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
                value={item.istanceTime}
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
  //data to post is this.state.toAdd, with totalTime as 00:00, id of new habit is this.state.habits.length

  // call put if this.state.shouldUpdate.update === true
  // data to put is totalTime of habit with said id (consider to add totalTime property to shouldUpdate)
  // update totalTime only after response from server (change current implementation)
  // reset shouldUpdate to false and id to null

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
