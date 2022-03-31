import React from "react";
import Header from "../components/Header";
import "../styles/Layout.css";

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

const Layout2 = (props) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      {props.children}
    </div>
  );
};

export { Layout, Layout2 };
