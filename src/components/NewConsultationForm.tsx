import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

interface Props {
  userID: number;
  subjects: string[];
}

interface State {
  participantLimit: string;
  duration: string;
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  description: string;
  subjects: string[];
}

export class NewConsultationForm extends Component<Props, State> {
  state: State = {
    participantLimit: "",
    duration: "",
    year: "",
    month: "",
    day: "",
    hour: "",
    minute: "",
    description: "",
    subjects: []
  };
  handleSubmit(id: number) {
    axios({
      method: "post",
      url: "http://localhost:8080/createNewConsultation",
      data: {
        hostID: id,
        participantLimit: this.state.participantLimit,
        duration: this.state.duration,
        description: this.state.description,
        year: this.state.year,
        month: this.state.month,
        day: this.state.day,
        hour: this.state.hour,
        minute: this.state.minute,
        subjects: this.state.subjects
      }
    });
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ [e.target.name]: e.target.value } as Pick<State, any>);
  }

  handleSubjectChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      this.state.subjects.push(e.target.name);
    } else {
      this.state.subjects = this.state.subjects.filter(
        subject => subject !== e.target.name
      );
    }
  }

  subjectCheckList() {
    return this.props.subjects.map(subject => (
      <Form.Check
        inline
        label={subject}
        name={subject}
        type="checkbox"
        onChange={this.handleSubjectChange.bind(this)}
      />
    ));
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
            min="1"
            max="100"
            required
          />
          <br />
          <Form.Control
            type="number"
            name="duration"
            onChange={this.handleChange.bind(this)}
            placeholder="Duration"
            required
            min="15"
            max="180"
          />
          <br />
          <Form.Control
            type="number"
            name="year"
            onChange={this.handleChange.bind(this)}
            placeholder="year"
          />
          <br />
          <Form.Control
            type="number"
            name="month"
            onChange={this.handleChange.bind(this)}
            placeholder="month"
          />
          <br />
          <Form.Control
            type="number"
            name="day"
            onChange={this.handleChange.bind(this)}
            placeholder="day"
          />
          <br />
          <Form.Control
            type="number"
            name="hour"
            onChange={this.handleChange.bind(this)}
            placeholder="hour"
          />
          <br />
          <Form.Control
            type="number"
            name="minute"
            onChange={this.handleChange.bind(this)}
            placeholder="minute"
          />
          <br />
          {this.subjectCheckList()}
          <br />
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              name="description"
              onChange={this.handleChange.bind(this)}
              placeholder="description"
              rows="3"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default NewConsultationForm;
