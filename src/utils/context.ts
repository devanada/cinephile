import { createContext } from "react";
import { contextType } from "../types/context";

const ctx = {
  theme: "",
  setTheme: () => {},
};

export const ThemeContext = createContext<contextType>(ctx);
