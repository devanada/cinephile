import React, { Component } from "react";
import logo from "../assets/logo.svg";
import "../styles/Header.css";

export default class Header extends Component {
  render() {
    return (
      <div className="header-container fixed top-0 left-0 right-0">
        <h1 className="text-white text-2xl font-bold">Hell's Kitchen</h1>
        <img src={logo} className="header-logo" alt="logo" />
        <div>
          <p className="text-white">My Favorite Movies</p>
        </div>
      </div>
    );
  }
}
