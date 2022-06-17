import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { ThemeContext } from "../utils/context";
import logo from "../assets/logo.svg";
import "../styles/Header.css";

interface context {
  theme: string | null;
  setTheme: (theme: string) => void;
}

const Header = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useContext<context>(ThemeContext);

  const handleThemeChange = (mode: string) => {
    setTheme(mode);
    localStorage.setItem("theme", mode);
  };

  return (
    <nav className="sticky top-0 w-full border-gray-200 px-2 sm:px-4 py-2.5 bg-zinc-800">
      <div className="container items-center grid grid-flow-row grid-cols-3  mx-auto">
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
          <MdFavorite
            className="w-8 h-8 text-white"
            onClick={() => navigate("/favorites")}
          />
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
