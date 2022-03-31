/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import Homepage from "../pages/Homepage";
import Detail from "../pages/Detail";
import Error404 from "../pages/404";

import { ThemeContext } from "../utils/context";
import { store } from "../utils/redux/store/store";

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
