import React, { Component } from "react";
import ConsultationItem from "./ConsultationItem";
import ConsultationModel from "../models/ConsultationModel";

interface Props {
  consultations: ConsultationModel[];
}
interface State {}

export default class ConsultationList extends Component<Props, State> {
  state = {};

  render() {
    return this.props.consultations.map(consultation => (
      <ConsultationItem key={consultation.id} consultation={consultation} />
    ));
  }
}
