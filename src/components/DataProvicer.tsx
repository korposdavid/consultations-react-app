import React, { Component } from "react";
import myContext from "./myContext";

interface Props {}
interface State {}

export default class DataProvicer extends Component<Props, State> {
  state = {};

  render() {
    return (
      <myContext.Provider value={}>{this.props.children}</myContext.Provider>
    );
  }
}
