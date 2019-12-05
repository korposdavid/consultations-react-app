import { confirmAlert } from "react-confirm-alert";
import axios from "axios";
import React from "react";
import ConsultationModel from "../models/ConsultationModel";

interface Props {
  userID: number;
  refetchAllConsultations: Function;
  joinedConsultations: ConsultationModel[];
  userAlreadyJoined: boolean;
  consultation: ConsultationModel;
}

export const ConsultationButton: React.FC<Props> = props => {
  function isJoinDisabled() {
    return !(
      props.consultation.participantLimit >
      props.consultation.participants.length
    );
  }

  function isUserIsHost() {
    return props.consultation.host.id === props.userID;
  }

  function handleJoin() {
    axios({
      method: "post",
      url: "http://localhost:8080/joinConsultation",
      data: {
        userID: props.userID,
        consultationID: props.consultation.id
      }
    }).then(response => {
      props.refetchAllConsultations();
    });
  }

  function handleCancel() {
    axios({
      method: "post",
      url: "http://localhost:8080/cancelConsultation",
      data: {
        userID: props.userID,
        consultationID: props.consultation.id
      }
    }).then(response => {
      props.refetchAllConsultations();
    });
  }

  function handleDrop() {
    axios({
      method: "post",
      url: "http://localhost:8080/dropConsultation",
      data: {
        userID: props.userID,
        consultationID: props.consultation.id
      }
    }).then(response => {
      props.refetchAllConsultations();
    });
  }

  function submitDestroy(functionToCall: Function, messageSnippet: string) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure to {messageSnippet.toLowerCase()} the consultation?</h1>
            <button className="btn btn-warning m-2" onClick={() => onClose()}>
              Exit
            </button>
            <button
              className="btn btn-danger m-2"
              onClick={() => {
                functionToCall();
                onClose();
              }}
            >
              Yes, {messageSnippet} it!
            </button>
          </div>
        );
      }
    });
  }
  return isUserIsHost() ? (
    <button onClick={() => submitDestroy(handleCancel, "Cancel")} className="btn btn-danger m-2">Cancel</button>
  ) : !props.userAlreadyJoined ? (
    <button
      disabled={isJoinDisabled()}
      onClick={handleJoin}
      className="btn btn-success m-2"
    >
      Join
    </button>
  ) : (
    <button onClick={() => submitDestroy(handleDrop, "Drop")} className="btn btn-danger m-2">
      Drop
    </button>
  );
};
