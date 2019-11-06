import React, { Component } from "react";
import ConsultationModel from "../models/ConsultationModel";

interface Props {
  consultation: ConsultationModel;
}
interface State {}

export default class ConsultationItem extends Component<Props, State> {
  state = {
    showDetailedView: false,
    showMore: "Show more!",
    showLess: "Show less!",
    buttonText: "Show more!"
  };

  changeView(){
    this.setState({
      showDetailedView : ! this.state.showDetailedView,
    })
    if(this.state.buttonText != this.state.showMore){
      this.setState({buttonText : this.state.showMore})
    }
    else if(this.state.buttonText != this.state.showLess){
      this.setState({buttonText : this.state.showLess})
    }
  }

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
          { this.state.showDetailedView ?
            <div>
              <p className="list-group-item-text">Participants: {participants}</p>
              <p className="list-group-item-text">Duration: {duration}</p>
              <p className="list-group-item-text">ParticipantLimit: {participantLimit}</p>
              <p className="list-group-item-text">Description: {description}</p>
            </div>
            :null
          }
          <button className="btn btn-success" onClick={()=>this.changeView()}>{this.state.buttonText}</button>
        </div>
      </a>
    );
  }
}
