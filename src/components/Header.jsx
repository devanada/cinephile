import React, { Component } from "react";
import logo from "../assets/logo.svg";

export class Header extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <>
        <img src={logo} className="App-logo" alt="logo" />
        <p
          style={{
            fontSize: 30,
            color: this.props.component === "Class" ? "yellow" : "teal",
          }}
        >
          Edit <code>src/App.js</code> and {this.props.label}.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>{JSON.stringify(this.props.data, null, 1)}</p>
      </>
    );
  }
}

export default Header;
