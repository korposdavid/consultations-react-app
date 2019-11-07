import React, { Component } from "react";
import ConsultationItem from "./ConsultationItem";
import ConsultationModel from "../models/ConsultationModel";
import myContext from "./myContext";

interface Props {
  allConsultations: boolean;
}
interface State {}

export default class ConsultationList extends Component<Props, State> {
  state = {};

  render() {
    return (
      <myContext.Consumer>
        {value => {
          if (this.props.allConsultations) {
            return value.consultations.map(
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
          } else {
            return value.userConsultations.map(
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
          }
        }}
      </myContext.Consumer>
    );
  }
}
