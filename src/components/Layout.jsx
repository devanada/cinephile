import React, { Component } from "react";
import "../styles/Layout.css";

class Layout extends Component {
  constructor(props) {
    super();
  }

  render() {
    return <div className="layout-container">{this.props.children}</div>;
  }
}

export { Layout };
