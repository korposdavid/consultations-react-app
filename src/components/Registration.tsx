import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import MyContext from "./MyContext";
import { Redirect } from "react-router";

interface Props {
  username: String;
}

interface State {
  username: String;
  password1: String;
  password2: String;
  email: String;
  level: String;
}

export class Registration extends Component<Props, State> {
  state: State = {
    username: "",
    password1: "",
    password2: "",
    email: "",
    level: ""
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value } as Pick<State, any>);
  };

  redirectHome = () => {
    return <Redirect to={{ pathname: "/" }}></Redirect>;
  };

  handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.state.password1 !== this.state.password2) {
      alert("Password does not match");
    } else {
      axios({
        method: "post",
        url: "http://localhost:8080/registration",
        data: {
          username: this.state.username,
          password1: this.state.password1,
          password2: this.state.password2,
          email: this.state.email,
          level: this.state.level
        }
      }).then(resp => {
        resp.data === "OK"
          ? alert("Registration successful")
          : alert(resp.data);
      });
    }
  };

  render() {
    return (
      <MyContext.Consumer>
        {value => {
          return value.user.username === "" ? (
            <div className="container" style={containerStyle}>
              <div className="register" style={formStyle}>
                <Form onSubmit={this.handleRegister}>
                  <Form.Row>
                    <Form.Group as={Col} controlId="username">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        onChange={this.handleChange}
                        placeholder="Enter username"
                        required
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        onChange={this.handleChange}
                        placeholder="Enter email"
                        required
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword1">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password1"
                        onChange={this.handleChange}
                        placeholder="Password"
                        required
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword2">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password2"
                        onChange={this.handleChange}
                        placeholder="Password"
                        required
                        style={backgroundInput}
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridLevel">
                      <Form.Label>Level</Form.Label>
                      <Form.Control
                        name="level"
                        onChange={this.handleChange}
                        required
                        as="select"
                      >
                        <option></option>
                        <option>PROGBASICS</option>
                        <option>WEB</option>
                        <option>OOP</option>
                        <option>ADVANCE</option>
                      </Form.Control>
                    </Form.Group>
                  </Form.Row>

                  <Button variant="success" type="submit">
                    Registration
                  </Button>
                </Form>
              </div>
            </div>
          ) : (
            <Redirect to={{ pathname: "/" }}></Redirect>
          );
        }}
      </MyContext.Consumer>
    );
  }
}

const backgroundInput = {
  background: "rgba(255,255,255,0)",
  opacity: "1"
};

const formStyle = {
  background: "rgba(250,255,250,1)",
  padding: "20px",
  margin: "15px",
  border: "1px solid black",
  borderRadius: "0.25rem",
  opacity: "1",
  display: "flex"
};

const containerStyle = {
  display: "flex"
};

export default Registration;
