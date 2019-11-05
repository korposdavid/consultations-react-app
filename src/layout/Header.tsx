import React from "react";

interface Props {}

export const Header: React.FC<Props> = () => {
  return (
    <header style={headerStyle}>
      <h1>Coolzontations</h1>
    </header>
  );
};

const headerStyle = {
  background: "#333",
  color: "#fff",
  padding: "10px"
};
