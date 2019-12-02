import React, { Component } from "react";
import ConsultationModel from "../models/ConsultationModel";
import MyContext from "./MyContext";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ConsultationButton } from "./ConsultationButton";

interface Props {
  consultation: ConsultationModel;
}
interface State {}

export default class ConsultationItem extends Component<Props, State> {
  state = {
    showDetailedView: false,
    isJoined: false,
    showMore: "Show more!",
    showLess: "Show less!",
    buttonText: "Show more!"
  };

  userAlreadyJoined(id: number) {
    return (
      this.props.consultation.participants.filter(row => row.id === id).length >
      0
    );
  }

  changeView() {
    this.setState({
      showDetailedView: !this.state.showDetailedView
    });
    if (this.state.buttonText !== this.state.showMore) {
      this.setState({ buttonText: this.state.showMore });
    } else if (this.state.buttonText !== this.state.showLess) {
      this.setState({ buttonText: this.state.showLess });
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

    const { username, level } = this.props.consultation.host;
    const participants = this.props.consultation.participants
      .map(x => x.username)
      .join(", ");

    return (
      <MyContext.Consumer>
        {value => {
          return (
            <button
              className="list-group-item clearfix btn-block m-2"
              style={bodyStyle}
            >
              <div>
                <h4 className="list-group-item-header">{date}</h4>
                {subjects.length > 0 ? (
                  <p className="list-group-item-text">
                    Subjects: {subjects.join(", ")}{" "}
                  </p>
                ) : (
                  ""
                )}
                <p className="list-group-item-text">
                  Host: {username + " " + level}
                </p>
                <p className="list-group-item-text">
                  Participants({participantLimit}): {participants}{" "}
                </p>
                {this.state.showDetailedView ? (
                  <div>
                    <p className="list-group-item-text">
                      Duration: {duration} minutes
                    </p>
                    <p className="list-group-item-text">
                      Description: {description}
                    </p>
                  </div>
                ) : null}
                <button
                  className="btn btn-success m-2"
                  onClick={() => this.changeView()}
                >
                  {this.state.buttonText}
                </button>
                <ConsultationButton
                  consultation={this.props.consultation}
                  userID={value.id}
                  consultationID={id}
                  refetchUserConsultations={value.refetchUserConsultations}
                  refetchAllConsultations={value.refetchAllConsultations}
                  refetchHostedConsultations={value.refetchHostedConsultations}
                  joinedConsultations={value.joinedConsultations}
                  userLevel={value.level}
                  userName={value.username}
                  userAlreadyJoined={this.userAlreadyJoined(value.id)}
                ></ConsultationButton>
              </div>
            </button>
          );
        }}
      </MyContext.Consumer>
    );
  }
}

const bodyStyle = {
  opacity: "0.98",
  borderRadius: "0.25rem",
  border: "1px solid black"
};
