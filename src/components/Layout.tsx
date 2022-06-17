import React, { lazy } from "react";
import "../styles/Layout.css";
const Header = lazy(() => import("./Header"));

interface layoutProps {
  children?: React.ReactNode;
  onScroll?: (e: React.UIEvent<HTMLElement>) => void;
  setRef?: React.Ref<HTMLDivElement>;
}

const Layout = ({ onScroll, setRef, children }: layoutProps) => {
  return (
    <div
      className="layout-container bg-white dark:bg-black"
      onScroll={onScroll}
      ref={setRef}
    >
      {/* <Header onClick={() => localStorage.setItem("theme", "dark")} /> */}
      <Header />
      {children}
    </div>
  );
};

export default Layout;
