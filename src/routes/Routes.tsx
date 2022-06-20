/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThemeContext } from "../utils/context";
import { reduxAction } from "../utils/redux/actions/action";

const Homepage = lazy(() => import("../pages/Homepage"));
const Favorites = lazy(() => import("../pages/Favorites"));
const Detail = lazy(() => import("../pages/Detail"));
const Search = lazy(() => import("../pages/Search"));
const Auth = lazy(() => import("../pages/Auth"));
const Error404 = lazy(() => import("../pages/404"));

function App() {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState<string | null>(
    localStorage.getItem("theme")
  );
  const background = useMemo(() => ({ theme, setTheme }), [theme]);

  useEffect(() => {
    const getLocal = localStorage.getItem("session_id");
    if (getLocal) {
      const getLocalParse = JSON.parse(getLocal);
      const temp = {
        session_id: getLocalParse.session_id,
        user_id: getLocalParse.user_id,
      };
      dispatch(reduxAction("SET_SESSION_ID", temp));
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={background}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/homepage" />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/detail/:movie_id" element={<Detail />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
