import React from "react";
import "../styles/Layout.css";

const Layout2 = (props) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      {props.children}
    </div>
  );
};

export default Layout2;
