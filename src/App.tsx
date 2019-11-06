import React, { Component } from "react";
import "./App.css";
import { Header } from "./layout/Header";
import axios from "axios";
import ConsultationList from "./components/ConsultationList";
import myContext from "./components/myContext";

class App extends Component {
  state = {
    consultations: []
  };

  componentDidMount() {
    axios.get("http://localhost:8080/consultations").then(response => {
      this.setState({ consultations: response.data });
    });
  }

  render() {
    return (
      <myContext.Provider value={{ username: "myUser", id: 4, level: "WEB" }}>
        <div className="App">
          <Header />
          <ConsultationList
            consultations={this.state.consultations}
          ></ConsultationList>
        </div>
      </myContext.Provider>
    );
  }
}

export default App;
