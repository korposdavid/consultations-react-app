import React, { Component } from "react";
import ConsultationItem from "./ConsultationItem";
import ConsultationModel from "../models/ConsultationModel";
import myContext from "./myContext";

interface Props {
  listType: listType;
}
interface State {}

export default class ConsultationList extends Component<Props, State> {
  state = {};

  render() {
    return (
      <myContext.Consumer>
        {value => {
          const consultationsToRender =
            this.props.listType === listType.All
              ? value.consultations
              : this.props.listType === listType.Joined
              ? value.joinedConsultations
              : value.hostedConsultations;
          return consultationsToRender.map(
            (consultation: ConsultationModel) => (
              <div className="container">
                <div className="row">
                  <div className="col-sm-12">
                    <ConsultationItem
                      key={consultation.id}
                      consultation={consultation}
                    />
                  </div>
                </div>
              </div>
            )
          );
        }}
      </myContext.Consumer>
    );
  }
}

export enum listType {
  All,
  Joined,
  Hosted
}
