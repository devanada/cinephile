import React, { Component } from "react";
import Header from "../components/Header";
import "../styles/Layout.css";

class Layout extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="layout-container bg-white dark:bg-black">
        {/* <div className="layout-container"> */}
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export { Layout };
