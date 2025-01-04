import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { LoginReducer } from "../reducer/LoginReducer";

const LoginContext = createContext();

const initialState = {
  token: "",
};

export const LoginContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LoginReducer, initialState);

  const getToken = useCallback(() => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("Token is not available");
      } else {
        dispatch({ type: "SET_LOGIN_TOKEN", payload: token });
      }
    } catch (error) {
      console.error("Error accessing localStorage: ", error);
    }
  }, []);

  useEffect(() => {
    getToken();
  }, [getToken]);

  return (
    <LoginContext.Provider value={{ ...state, getToken }}>
      {children}
    </LoginContext.Provider>
  );
};

export default function useLoginContext() {
  return useContext(LoginContext);
}
