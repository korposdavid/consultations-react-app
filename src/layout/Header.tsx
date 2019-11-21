import React from "react";
import { Link } from "react-router-dom";
import myContext from "../components/myContext";
import Button from "react-bootstrap/Button";

interface Props {}

export const Header: React.FC<Props> = () => {
  return (
    <myContext.Consumer>
      {value => {
        return (
          <header style={headerStyle}>
            <div>
              <h1>Coolzontations</h1>
              <Link className={linkClass} to="/">
                {" "}
                Home{" "}
              </Link>
              <Link className={linkClass} to="/joinedConsultations">
                Joined Consultations
              </Link>
              <Link className={linkClass} to="/hostedConsultations">
                Hosted Consultations
              </Link>
              <Button onClick={() => value.newConsultationForm()}>
                New Consultation
              </Button>
            </div>
          </header>
        );
      }}
    </myContext.Consumer>
  );
};

const linkClass = "btn btn-outline-success m-2";

const headerStyle = {
  background: "#333",
  color: "#fff",
  padding: "10px"
};
