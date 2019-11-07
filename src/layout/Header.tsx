import React from "react";
import { Link } from "react-router-dom";

interface Props {}

export const Header: React.FC<Props> = () => {
  return (
    <header style={headerStyle}>
      <h1>Coolzontations</h1>
      <Link to="/"> Home </Link>
      <Link to="/myConsultations">My Consultations</Link>
    </header>
  );
};

const headerStyle = {
  background: "#333",
  color: "#fff",
  padding: "10px"
};
