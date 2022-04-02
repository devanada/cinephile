/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeContext } from "../utils/context";
import { store } from "../utils/redux/store/store";

const Homepage = lazy(() => import("../pages/Homepage"));
const Detail = lazy(() => import("../pages/Detail"));
const Error404 = lazy(() => import("../pages/404"));

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const background = useMemo(() => ({ theme, setTheme }), [theme]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={background}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/homepage" />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/detail/:movie_id" element={<Detail />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </Provider>
  );
}

export default App;
