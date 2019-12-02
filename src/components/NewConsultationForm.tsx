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
  date: string;
  description: string;
  subjects: string[];
}

export class NewConsultationForm extends Component<Props, State> {
  state: State = {
    participantLimit: "",
    duration: "",
    date: "",
    description: "",
    subjects: []
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
        description: this.state.description,
        subjects: this.state.subjects
      }
    });
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ [e.target.name]: e.target.value } as Pick<State, any>);
  }

  handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      this.state.subjects.push(e.target.name);
    } else {
      this.state.subjects = this.state.subjects.filter(
        subject => subject !== e.target.name
      );
    }
  }

  getMinDate() {
    let today = new Date();
    today.setDate(today.getDate() + 1);
    let day = today.getDate(),
      month = today.getMonth() + 1,
      year = today.getFullYear();
    const returnDate =
      "" +
      year +
      "-" +
      (month < 10 ? "0" : "") +
      month +
      "-" +
      (day < 10 ? "0" : "") +
      day +
      "T08:00";
    return returnDate;
  }

  subjectCheckList() {
    return this.props.subjects.map(subject => (
      <Form.Check
        inline
        label={subject}
        name={subject}
        type="checkbox"
        onChange={this.handleSubjectChange}
      />
    ));
  }

  render() {
    const time = this.getMinDate();
    console.log(time);
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
            type="datetime-local"
            name="date"
            min={time}
            onChange={this.handleChange.bind(this)}
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
          <Button variant="success" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default NewConsultationForm;
