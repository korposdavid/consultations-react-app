import React, { Component } from "react";
import ConsultationModel from "../models/ConsultationModel";
import myContext from "./myContext";
import axios from "axios";

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
      this.props.consultation.participants.filter(row => row.id === id) !== null
    );
    // for (const user of this.props.consultation.participants) {
    //   if (user.id === id) {
    //     return true;
    //   }
    // }
    // return false;
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
    });
    this.setState({ isJoined: true });
    userConsulatations.push(this.props.consultation);
    this.props.consultation.participants.push({
      username: userName,
      id: userID,
      level: userLevel
    });
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
      <myContext.Consumer>
        {value => {
          return (
            <button className="list-group-item clearfix btn-block m-2">
              <div>
                <h4 className="list-group-item-header">{date}</h4>
                <p className="list-group-item-text">
                  Subjects: {subjects.join(", ")}
                </p>
                <p className="list-group-item-text">
                  Host: {username + " " + level}
                </p>
                <p className="list-group-item-text">
                  Participants: {participants}{" "}
                </p>
                {this.state.showDetailedView ? (
                  <div>
                    <p className="list-group-item-text">Duration: {duration}</p>
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
                    onClick={() =>
                      this.handleJoin(
                        value.id,
                        id,
                        value.userConsultations,
                        value.level,
                        value.username
                      )
                    }
                    className="btn btn-success m-2"
                  >
                    Join
                  </button>
                ) : null}
              </div>
            </button>
          );
        }}
      </myContext.Consumer>
    );
  }
}
