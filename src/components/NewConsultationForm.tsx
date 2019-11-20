import React, { Component, SyntheticEvent } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

interface Props {
  userID: number;
}

export class NewConsultationForm extends Component<Props> {
  handleSubmit(e: any, id: number) {
    // const form = e.currentTarget;
    console.log("form");
    axios({
      method: "post",
      url: "http://localhost:8080/createNewConsultation",
      data: {
        hostID: id,
        participantLimit: 2,
        duration: 30,
        description: "apacuka fundaluka"
      }
    });
  }

  render() {
    return (
      <div>
        <Form
          onSubmit={(event: any) => this.handleSubmit(event, this.props.userID)}
        >
          <Form.Control
            type="text"
            name="participant"
            placeholder="Participant Limit"
          />
          <br />
          <Form.Control type="number" name="duration" placeholder="Duration" />
          <br />
          <Form.Control type="number" name="year" placeholder="year" />
          <br />
          <Form.Control type="number" name="month" placeholder="month" />
          <br />
          <Form.Control type="number" name="day" placeholder="day" />
          <br />
          <Form.Control type="number" name="hour" placeholder="hour" />
          <br />
          <Form.Control type="number" name="minute" placeholder="minute" />
          <br />
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control as="textarea" rows="3" />
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
