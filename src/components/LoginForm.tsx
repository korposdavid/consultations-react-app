import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Col from "react-bootstrap/Col";
import UserModel from "../models/UserModel"

interface Props {
  setUser: Function;
}

interface State {
  username: string;
  password: string;
}

export class LoginForm extends Component<Props, State> {
  state: State = {
    username: "",
    password: ""
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:8080/auth/signin",
      data: {
        username: this.state.username,
        password: this.state.password
      }
    }).then(response => {
      const responseToken: string = response.data.token;
      const user: UserModel = response.data.user;
      this.props.setUser(user);
      localStorage.setItem('token', responseToken);
    }).catch(() => {
      alert('Your username or password was wrong.');
    })
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value } as Pick<State, any>);
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Row>
          <Col md={2}>
            <Form.Control
              type="text"
              onChange={this.handleChange}
              name="username"
              placeholder="Username"
              required
            />
          </Col>
          <Col md={2}>
            <Form.Control
              name="password"
              type="password"
              onChange={this.handleChange}
              placeholder="Password"
              required
            />
          </Col>
          <Col md={1}>
            <Button name="Login" variant="success" type="submit">
              Login
            </Button>
          </Col>
        </Form.Row>
      </Form>
    );
  }
}

export default LoginForm;
