import React from "react";
import { Link } from "react-router-dom";
import myContext from "../components/myContext";

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
            <Link className={linkClass} to="/myConsultations">
              {value.username}
            </Link>
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
