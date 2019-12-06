import { confirmAlert } from "react-confirm-alert";
import axios from "axios";
import React from "react";
import ConsultationModel from "../models/ConsultationModel";

interface Props {
  userID: number;
  refetchUserConsultations: Function;
  refetchAllConsultations: Function;
  refetchHostedConsultations: Function;
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
      props.refetchUserConsultations();
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
      console.log(response.data);
      props.refetchHostedConsultations();
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
      props.refetchUserConsultations();
      props.refetchAllConsultations();
    });
  }

  function submitDrop() {
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
                handleDrop();
                onClose();
              }}
            >
              Yes, Drop it!
            </button>
          </div>
        );
      }
    });
  }
  return isUserIsHost() ? (
    <button onClick={handleCancel} className="btn btn-danger m-2">
      Cancel
    </button>
  ) : !props.userAlreadyJoined ? (
    <button
      disabled={isJoinDisabled()}
      onClick={handleJoin}
      className="btn btn-success m-2"
    >
      Join
    </button>
  ) : (
    <button onClick={submitDrop} className="btn btn-danger m-2">
      Drop
    </button>
  );
};
