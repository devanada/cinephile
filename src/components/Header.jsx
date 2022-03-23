import React, { Component } from "react";
import logo from "../assets/logo.svg";
import "../styles/Header.css";

export default class Header extends Component {
  render() {
    return (
      <div className="header-container fixed top-0 left-0 right-0 bg-zinc-800">
        <h1 className="text-white text-2xl font-bold">Hell's Kitchen</h1>
        <img src={logo} className="header-logo" alt="logo" />
        <div className="flex">
          {/* <p className="text-white">My Favorite Movies</p> */}
          <button className="bg-sky-400 hover:bg-sky-600 rounded font-bold p-2">
            Login
          </button>
        </div>
      </div>
    );
  }
}
