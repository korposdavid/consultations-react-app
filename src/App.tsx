import React, { Component } from "react";
import "./App.css";
import { Header } from "./layout/Header";
import axios from "axios";
import ConsultationList from "./components/ConsultationList";

class App extends Component {
  state = {
    consultations: []
  };

  componentDidMount() {
    axios.get("http://10.44.13.27:8080/consultations").then(response => {
      this.setState({ consultations: response.data });
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <ConsultationList
          consultations={this.state.consultations}
        ></ConsultationList>
      </div>
    );
  }
}

export default App;
