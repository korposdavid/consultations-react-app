import React, { Component } from "react";
import ConsultationModel from "../models/ConsultationModel";

interface Props {
  consultation: ConsultationModel;
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

    const hostName = this.props.consultation.host.username;
    const hostLevel = this.props.consultation.host.level;
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
          <p className="list-group-item-text">
            Host: {hostName + " " + hostLevel}
          </p>
          <p className="list-group-item-text">Participants: {participants}</p>
        </div>
      </a>
    );
  }
}
