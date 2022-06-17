import { ReactChildren, ReactChild } from "react";
import "../styles/Layout.css";

interface Child {
  children: ReactChild | ReactChildren;
}

const Layout2 = ({ children }: Child) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      {children}
    </div>
  );
};

export default Layout2;
