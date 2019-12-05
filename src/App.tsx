import React, { Component } from "react";
import "./App.css";
import { Header } from "./layout/Header";
import axios from "axios";
import ConsultationList, { listType } from "./components/ConsultationList";
import MyContext from "./components/MyContext";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import NewConsultationForm from "./components/NewConsultationForm";
import { confirmAlert } from "react-confirm-alert";
import LoginForm from "./components/LoginForm";
import UserModel from "./models/UserModel";
import ConsultationModel from "./models/ConsultationModel";
import Registration from "./components/Registration";

interface Props {}

interface State {
  user: UserModel;
  consultations: ConsultationModel[];
  joinedConsultations: ConsultationModel[];
  hostedConsultations: ConsultationModel[];
  refetchUserConsultations: () => void;
  refetchAllConsultations: () => void;
  refetchHostedConsultations: () => void;
  newConsultationForm: () => void;
  fetchSubjects: () => void;
  setUser: (user: UserModel) => void;
  logout: () => void;
  subjects: string[];
}

class App extends Component<Props, State> {
  state: State = {
    user: { username: "", level: "", id: 0 },
    consultations: [],
    joinedConsultations: [],
    hostedConsultations: [],
    refetchUserConsultations: () => {
      axios
        .get(
          `http://localhost:8080/myJoinedConsultations/${this.state.user.id}`
        )
        .then(response => {
          this.setState({ joinedConsultations: response.data });
        });
    },
    refetchAllConsultations: () => {
      this.state.refetchHostedConsultations();
      this.state.refetchUserConsultations();
      axios.get("http://localhost:8080/consultations").then(response => {
        this.setState({ consultations: response.data });
      });
    },
    refetchHostedConsultations: () => {
      axios
        .get(
          `http://localhost:8080/myHostedConsultations/${this.state.user.id}`
        )
        .then(response => {
          this.setState({ hostedConsultations: response.data });
        });
    },
    newConsultationForm: () => {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="custom-ui" style={formStyle}>
              <NewConsultationForm
                userID={this.state.user.id}
                subjects={this.state.subjects}
              ></NewConsultationForm>
            </div>
          );
        }
      });
    },
    fetchSubjects: () => {
      axios.get("http://localhost:8080/subjects").then(response => {
        this.setState({ subjects: response.data });
      });
    },
    setUser: (user: UserModel) => {
      this.setState({ user: user }, () => {
        this.state.refetchAllConsultations();
      });
    },
    logout: () => {
      this.state.setUser({ username: "", level: "", id: 0 });
      localStorage.removeItem("token");
    },
    subjects: []
  };

  componentDidMount() {
    this.state.refetchAllConsultations();
    this.state.fetchSubjects();
  }

  render() {
    return (
      <Router>
        <MyContext.Provider value={{ ...this.state }}>
          <div className="App">
            <Header />
            <PrivateRoute
              exact
              path="/"
              component={ConsultationList}
              username={this.state.user.username}
              listType={listType.All}
            />
            <PrivateRoute
              path="/hostedConsultations"
              component={ConsultationList}
              username={this.state.user.username}
              listType={listType.Hosted}
            />
            <PrivateRoute
              path="/joinedConsultations"
              component={ConsultationList}
              username={this.state.user.username}
              listType={listType.Joined}
            />
            <Route path="/auth" component={Registration} />
          </div>
        </MyContext.Provider>
      </Router>
    );
  }
}

const formStyle = {
  background: "rgba(250,250,250,1)",
  padding: "20px",
  border: "1px solid black",
  borderRadius: "0.25rem",
  opacity: "0.9"
};

export default App;
