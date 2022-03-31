import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import { ThemeContext } from "../utils/context";
import logo from "../assets/logo.svg";
import "../styles/Header.css";

const Header = (props) => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = (mode) => {
    setTheme(mode);
    localStorage.setItem("theme", mode);
  };

  return (
    <nav className="sticky top-0 w-full border-gray-200 px-2 sm:px-4 py-2.5 bg-zinc-800">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/">
          <h1 className="text-white text-2xl font-bold">Cinephile</h1>
        </Link>
        <img src={logo} className="header-logo" alt="logo" />
        <div className="flex justify-center items-center space-x-4">
          {/* <p className="text-white">My Favorite Movies</p> */}
          <button
            className="bg-neutral-500 hover:bg-neutral-600 rounded text-white font-bold p-2"
            onClick={props.onClick}
          >
            Login
          </button>
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
