import React, { Component } from "react";
import ConsultationModel from "../models/ConsultationModel";
import MyContext from "./MyContext";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

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

  handleJoin(
    userID: number,
    consultationID: number,
    userConsulatations: ConsultationModel[],
    userLevel: string,
    userName: string
  ) {
    axios({
      method: "post",
      url: "http://localhost:8080/joinConsultation",
      data: {
        userID,
        consultationID
      }
    }).then(response => {
      this.setState({ isJoined: true });
      userConsulatations.push(this.props.consultation);
      this.props.consultation.participants.push({
        username: userName,
        id: userID,
        level: userLevel
      });
    }
    );
  }

  handleDrop(
    userID: number,
    consultationID: number,
    refetchUserConsultations: Function,
    refetchAllConsultations: Function
  ) {
    axios({
      method: "post",
      url: "http://localhost:8080/dropConsultation",
      data: {
        userID,
        consultationID
      }
    }).then(response => {
      refetchUserConsultations();
      refetchAllConsultations();
      this.setState({ isJoined: false });
      this.props.consultation.participants = this.props.consultation.participants.filter(
        participant => participant.id !== userID
      );
    });
  }

  submit = (
    userID: number,
    consultationID: number,
    refetchUserConsultations: Function,
    refetchAllConsultations: Function
  ) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure to drop the consultation?</h1>
            <button className="btn btn-warning m-2" onClick={() => onClose()}>
              Exit
            </button>
            <button
              className="btn btn-danger m-2"
              onClick={() => {
                this.handleDrop(
                  userID,
                  consultationID,
                  refetchUserConsultations,
                  refetchAllConsultations
                );
                onClose();
              }}
            >
              Yes, Drop it!
            </button>
          </div>
        );
      }
    });
  };

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

  isJoinDisabled(userID: number) {
    if (this.props.consultation.host.id === userID) {
      return true;
    }
    return !(
      this.props.consultation.participantLimit >
      this.props.consultation.participants.length
    );
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
                 {subjects.length > 0 ? <p className="list-group-item-text">
                  Subjects: {subjects.join(", ")} </p>: ""}
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
                {!this.userAlreadyJoined(value.id) ? (
                  <button
                    disabled={this.isJoinDisabled(value.id)}
                    onClick={() =>
                      this.handleJoin(
                        value.id,
                        id,
                        value.joinedConsultations,
                        value.level,
                        value.username
                      )
                    }
                    className="btn btn-success m-2"
                  >
                    Join
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      this.submit(
                        value.id,
                        id,
                        value.refetchUserConsultations,
                        value.refetchAllConsultations
                      )
                    }
                    className="btn btn-danger m-2"
                  >
                    Drop
                  </button>
                )}
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
