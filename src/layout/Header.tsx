import React from "react";
import { Link } from "react-router-dom";
import MyContext from "../components/MyContext";
import Button from "react-bootstrap/Button";
import "../App.css";

interface Props {}

export const Header: React.FC<Props> = () => {
  return (
    <MyContext.Consumer>
      {value => {
        return (
          <header className="headerStyle">
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
              <Button
                variant="outline-success"
                onClick={() => value.newConsultationForm()}
              >
                New Consultation
              </Button>
            </div>
          </header>
        );
      }}
    </MyContext.Consumer>
  );
};

const linkClass = "btn btn-outline-success m-2";
