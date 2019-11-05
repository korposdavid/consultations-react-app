import React, { Component } from "react";
import ConsultationModel from "../models/ConsultationModel";

interface Props {
  consultation: ConsultationModel;
}
interface State {}

export default class ConsultationItem extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div>
        <p>{this.props.consultation.description}</p>
      </div>
    );
  }
}
