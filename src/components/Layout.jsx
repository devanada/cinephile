import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import "../styles/Layout.css";

const Layout = (props) => {
  return (
    <div
      className="layout-container bg-white dark:bg-black"
      onScroll={props.onScroll}
    >
      <Header />
      {props.children}
    </div>
  );
};

const Layout2 = (props) => {
  return (
    <div className="layout-container bg-white dark:bg-black">
      <Header />
      <Outlet />
    </div>
  );
};

export { Layout, Layout2 };
