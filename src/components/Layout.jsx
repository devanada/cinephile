import React, { lazy } from "react";
import "../styles/Layout.css";
const Header = lazy(() => import("../components/Header"));

const Layout = (props) => {
  return (
    <div
      className="layout-container bg-white dark:bg-black"
      onScroll={props.onScroll}
    >
      <Header onClick={() => localStorage.setItem("theme", "dark")} />
      {props.children}
    </div>
  );
};

export default Layout;
