import React, { Component } from "react";
import ConsultationModel from "../models/ConsultationModel";
import axios from "axios";
import myContext from "./myContext";

interface Props {
  consultation: ConsultationModel;
  username: string;
  id: number;
  level: string;
}
interface State {}

export default class ConsultationItem extends Component<Props, State> {
  state = {};

  render() {
    const {
      date,
      description,
      subjects,
      duration,
      participantLimit,
      id
    } = this.props.consultation;

    const { username, level } = this.props.consultation.host;
    const participants = this.props.consultation.participants
      .map(x => x.username)
      .join(", ");

    return (
      <a className="list-group-item clearfix">
        <div>
          <h4 className="list-group-item-header">{date}</h4>
          <p className="list-group-item-text">
            Subjects: {subjects.join(", ")}
          </p>
          <p className="list-group-item-text">Host: {username + " " + level}</p>
          <p className="list-group-item-text">Participants: {participants}</p>
        </div>
        <myContext.Consumer>
          {value => {
            return <span>{value.username}</span>;
          }}
        </myContext.Consumer>
      </a>
    );
  }
}
