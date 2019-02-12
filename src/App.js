import React, { Component } from "react";
import Habits from "./HabitsContainer";
import Header from "./Header";
import { Container } from "react-bootstrap";

class App extends Component {
  render() {
    return (
      <Container className="text-center">
        <Header />
        <Habits />
      </Container>
    );
  }
}

export default App;
