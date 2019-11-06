import React, { Component } from "react";
import "./App.css";
import { Header } from "./layout/Header";
import axios from "axios";
import ConsultationList from "./components/ConsultationList";
import myContext from "./components/myContext";

class App extends Component {
  state = { username: "myUser", id: 4, level: "WEB", consultations: [] };

  componentDidMount() {
    axios.get("http://localhost:8080/consultations").then(response => {
      this.setState({ consultations: response.data });
    });
  }

  render() {
    return (
      <myContext.Provider value={{ ...this.state }}>
        <div className="App">
          <Header />
          <ConsultationList></ConsultationList>
        </div>
      </myContext.Provider>
    );
  }
}

export default App;
