import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import Habits from "./habitsContainer";
import Header from "./header";
import "react-toastify/dist/ReactToastify.min.css";

class App extends Component {
  render() {
    return (
      <Container className="text-center">
        <ToastContainer />
        <Header />
        <Habits />
      </Container>
    );
  }
}

export default App;
