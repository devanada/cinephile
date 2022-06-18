/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FaSun, FaMoon, FaUserCircle } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";

import { ThemeContext } from "../utils/context";
import { RootState } from "../utils/redux/reducers/reducer";
import { reduxAction } from "../utils/redux/actions/action";
import { contextType } from "../types/context";
import logo from "../assets/logo.svg";
import "../styles/Header.css";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const { theme, setTheme } = useContext<contextType>(ThemeContext);
  const session_id = useSelector((state: RootState) => state.session_id || "");
  const open = Boolean(anchorEl);

  const handleThemeChange = (mode: string) => {
    setTheme(mode);
    localStorage.setItem("theme", mode);
  };

  const handleLogout = () => {
    const temp = {
      session_id: "",
      user_id: 0,
    };
    dispatch(reduxAction("SET_SESSION_ID", temp));
    localStorage.removeItem("session_id");
    navigate("/homepage");
    alert("Logout Successfully");
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
          {session_id !== "" && (
            <MdFavorite
              className="w-8 h-8 text-white"
              onClick={() => navigate("/favorites")}
            />
          )}
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
          <FaUserCircle
            className="w-8 h-8 text-white"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          />
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={() => setAnchorEl(null)}
            onClick={() => setAnchorEl(null)}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {session_id !== "" ? (
              <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
            ) : (
              <MenuItem onClick={() => navigate("/auth")}>Login</MenuItem>
            )}
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Header;
