import React from "react";
import { Link } from "react-router-dom";
import myContext from "../components/myContext";
import Button from "react-bootstrap/Button";

interface Props {}

export const Header: React.FC<Props> = () => {
  return (
    <header style={headerStyle}>
      <h1>Coolzontations</h1>
      <Link className={linkClass} to="/">
        {" "}
        Home{" "}
      </Link>
      <myContext.Consumer>
        {value => {
          return (
            <div>
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
          );
        }}
      </myContext.Consumer>
    </header>
  );
};

const linkClass = "btn btn-outline-success m-2";

const headerStyle = {
  background: "#333",
  color: "#fff",
  padding: "10px"
};
