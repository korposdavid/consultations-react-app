import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import React from "react";

interface Props {
  newConsultationForm: Function;
}

export const LoggedInHeaderPart: React.FC<Props> =  props => {
  const linkClass = "btn btn-outline-success m-2";

  return (
    <div>
      <Link className={linkClass} to="/">
        Home
      </Link>
      <Link className={linkClass} to="/joinedConsultations">
        Joined Consultations
      </Link>
      <Link className={linkClass} to="/hostedConsultations">
        Hosted Consultations
      </Link>
      <Button
        variant="outline-success"
        onClick={() => props.newConsultationForm}
      >
        New Consultation
      </Button>
    </div>
  );
};
