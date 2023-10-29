import { FC, UIEvent, Ref, ReactNode } from "react";
import "@/styles/Layout.css";

import Header from "./header";

interface Props {
  onScroll?: (e: UIEvent<HTMLElement>) => void;
  setRef?: Ref<HTMLDivElement>;
  children: ReactNode;
}

const Layout: FC<Props> = ({ onScroll, setRef, children }) => {
  return (
    <div
      className="layout-container flex flex-col items-center bg-white dark:bg-black"
      onScroll={onScroll}
      ref={setRef}
    >
      <Header />
      {children}
    </div>
  );
};

const Layout2: FC<Props> = ({ children }) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      {children}
    </div>
  );
};

export default Layout;
export { Layout, Layout2 };
