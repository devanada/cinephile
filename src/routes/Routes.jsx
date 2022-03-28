import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
// import Homepage from "../pages/Homepage";
import Homepage from "../pages/CopyHomepage";
import Detail from "../pages/Detail";
import Error404 from "../pages/404";

import { ThemeContext, AuthContext } from "../utils/context";
import { store } from "../utils/redux/store/store";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      setTheme(localTheme);
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  }, []);

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={theme}>
        <AuthContext.Provider value={false}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/homepage" />} />
              <Route path="/homepage" element={<Homepage />} />
              <Route path="/detail/:movie_id" element={<Detail />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      </ThemeContext.Provider>
    </Provider>
  );
}

export default App;
