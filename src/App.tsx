import React, { Component } from "react";
import "./App.css";
import { Header } from "./layout/Header";
import axios from "axios";
import ConsultationList, { listType } from "./components/ConsultationList";
import myContext from "./components/myContext";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  state = {
    username: "myUser",
    id: 7,
    level: "WEB",
    consultations: [],
    joinedConsultations: [],
    hostedConsultations: [],
    refetchUserConsultations: () => {
      axios
      .get(`http://localhost:8080/myJoinedConsultations/${this.state.id}`)
      .then(response => {
        this.setState({ joinedConsultations: response.data });
      });
    },
    refetchAllConsultations: () => {
      axios.get("http://localhost:8080/consultations").then(response => {
        this.setState({ consultations: response.data });
      });
    },
    refetchHostedConsultations: () => {
      axios.get(`http://localhost:8080/myHostedConsultations/${this.state.id}`).then(response => {
        this.setState({ hostedConsultations: response.data });
      });
    }
  };

  componentDidMount() {
    this.state.refetchAllConsultations();
    this.state.refetchUserConsultations();
    this.state.refetchHostedConsultations();
  }

  render() {
    return (
      <Router>
        <myContext.Provider value={{ ...this.state }}>
          <div className="App">
            <Header />
            <Route exact path="/">
              <ConsultationList listType={listType.All} />
            </Route>
            <Route path="/joinedConsultations">
              <ConsultationList listType={listType.Joined} />
            </Route>
            <Route path="/hostedConsultations">
              <ConsultationList listType={listType.Hosted} />
            </Route>
          </div>
        </myContext.Provider>
      </Router>
    );
  }
}

export default App;
