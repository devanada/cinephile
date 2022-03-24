import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import "../styles/Header.css";

const Header = () => {
  return (
    <div className="header-container fixed top-0 left-0 right-0 bg-zinc-800">
      <Link to="/">
        <h1 className="text-white text-2xl font-bold">Hell's Kitchen</h1>
      </Link>
      <img src={logo} className="header-logo" alt="logo" />
      <div className="flex">
        {/* <p className="text-white">My Favorite Movies</p> */}
        <button className="bg-neutral-500 hover:bg-neutral-600 rounded text-white font-bold p-2">
          Login
        </button>
      </div>
    </div>
  );
};

export default Header;
