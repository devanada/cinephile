/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, KeyboardEvent } from "react";
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
import "../styles/Header.css";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const { theme, setTheme } = useContext<contextType>(ThemeContext);
  const session_id = useSelector((state: RootState) => state.session_id || "");
  const query = useSelector((state: RootState) => state.query || "");
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
        <Link id="header-homepage" to="/">
          <h1 className="text-white text-2xl font-bold header-title tracking-wider">
            CINEPHILE
          </h1>
        </Link>
        <div className="flex justify-center">
          <input
            value={query}
            onChange={(e) => dispatch(reduxAction("SET_QUERY", e.target.value))}
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Search..."
            type="text"
            name="search"
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                navigate(`/search?q=${query}`);
                // navigate(`/search?q=${query}&t=movie`);
              }
            }}
          />
        </div>
        <div className="flex justify-end items-center space-x-4">
          {session_id !== "" && (
            <MdFavorite
              id="header-fav"
              className="w-8 h-8 text-white"
              onClick={() => navigate("/favorites")}
            />
          )}
          {theme === "dark" ? (
            <FaSun
              id="set-light-mode"
              className="w-8 h-8 text-white"
              onClick={() => handleThemeChange("light")}
            />
          ) : (
            <FaMoon
              id="set-dark-mode"
              className="w-8 h-8 text-white"
              onClick={() => handleThemeChange("dark")}
            />
          )}
          <FaUserCircle
            id="header-menu"
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
              <MenuItem id="menu-logout" onClick={() => handleLogout()}>
                Logout
              </MenuItem>
            ) : (
              <MenuItem id="menu-login" onClick={() => navigate("/auth")}>
                Login
              </MenuItem>
            )}
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Header;
