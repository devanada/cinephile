import React from "react";
import { Layout } from "../components/Layout";
import logo from "../assets/404.svg";

function Error404() {
  return (
    <Layout>
      <img src={logo} alt="logo" />
    </Layout>
  );
}

export default Error404;
