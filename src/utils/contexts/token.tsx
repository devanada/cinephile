import {
  ReactNode,
  createContext,
  useMemo,
  useState,
  useContext,
  useCallback,
} from "react";
import { useCookies } from "react-cookie";

interface Context {
  token: string;
  userID: string;
  changeToken: (token?: string, userID?: string) => void;
}

interface Props {
  children: ReactNode;
}

const contextValue = {
  token: "",
  userID: "",
  changeToken: () => {},
};

const TokenContext = createContext<Context>(contextValue);

function TokenProvider({ children }: Props) {
  const [cookies, setCookie, removeCookie] = useCookies([
    "session_id",
    "user_id",
  ]);
  const initToken = cookies.session_id ?? "";
  const initUserID = cookies.user_id ?? "";
  const [token, setToken] = useState(initToken);
  const [userID, setUserID] = useState(initUserID);

  const changeToken = useCallback(
    (token?: string, userID?: string) => {
      const newToken = token ?? "";
      const newUserID = userID ?? "";
      setToken(newToken);
      setUserID(newToken);
      if (token && userID) {
        setCookie("session_id", newToken);
        setCookie("user_id", newUserID);
      } else {
        removeCookie("session_id");
        removeCookie("user_id");
      }
    },
    [token, userID]
  );

  const tokenContextValue = useMemo(
    () => ({
      token,
      userID,
      changeToken,
    }),
    [token, userID, changeToken]
  );

  return (
    <TokenContext.Provider value={tokenContextValue}>
      {children}
    </TokenContext.Provider>
  );
}

function useToken() {
  const context = useContext(TokenContext);

  if (context === undefined) {
    console.log("ERROR, useToken must be used within TokenContext");
  }

  return context;
}

export { TokenProvider, useToken };
