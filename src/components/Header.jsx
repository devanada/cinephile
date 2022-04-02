import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import { ThemeContext } from "../utils/context";
import logo from "../assets/logo.svg";
import "../styles/Header.css";

const Header = (props) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = (mode) => {
    setTheme(mode);
    localStorage.setItem("theme", mode);
  };

  return (
    <nav className="sticky top-0 w-full border-gray-200 px-2 sm:px-4 py-2.5 bg-zinc-800">
      <div className="container flex items-center grid grid-flow-row grid-cols-3  mx-auto">
        <Link to="/">
          <h1 className="text-white text-2xl font-bold header-title tracking-wider">
            CINEPHILE
          </h1>
        </Link>
        <div
          className="flex justify-center"
          onClick={() => navigate("/nowhere")}
        >
          <img
            src={logo}
            className="header-logo place-self-center"
            alt="logo"
          />
        </div>
        <div className="flex justify-end items-center space-x-4">
          {/* <p className="text-white">My Favorite Movies</p> */}
          {/* <button
            className="bg-neutral-500 hover:bg-neutral-600 rounded text-white font-bold p-2"
            onClick={props.onClick}
          >
            Login
          </button> */}
          {theme === "dark" ? (
            <FaSun
              className="w-8 h-8 text-white"
              onClick={() => handleThemeChange("light")}
            />
          ) : (
            <FaMoon
              className="w-8 h-8 text-white"
              onClick={() => handleThemeChange("dark")}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
