import React, { Component, SyntheticEvent } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

interface Props {
  userID: number;
}

interface State {
  participantLimit: string;
  duration: string;
  date: string;
  description: string;
}

export class NewConsultationForm extends Component<Props, State> {
  state = {
    participantLimit: "",
    duration: "",
    date: "",
    description: ""
  };
  handleSubmit(id: number) {
    axios({
      method: "post",
      url: "http://localhost:8080/createNewConsultation",
      data: {
        hostID: id,
        date: this.state.date,
        participantLimit: this.state.participantLimit,
        duration: this.state.duration,
        description: this.state.description
      }
    });
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ [e.target.name]: e.target.value } as Pick<State, any>);
  }

  render() {
    return (
      <div>
        <Form onSubmit={() => this.handleSubmit(this.props.userID)}>
          <Form.Control
            type="number"
            name="participantLimit"
            onChange={this.handleChange.bind(this)}
            placeholder="Participant Limit"
          />
          <br />
          <Form.Control
            type="number"
            name="duration"
            onChange={this.handleChange.bind(this)}
            placeholder="Duration"
          />
          <br />
          <Form.Control
            type="datetime-local"
            name="date"
            onChange={this.handleChange.bind(this)}
          />
          <br />
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              name="description"
              onChange={this.handleChange.bind(this)}
              placeholder="description"
              rows="3"
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default NewConsultationForm;
