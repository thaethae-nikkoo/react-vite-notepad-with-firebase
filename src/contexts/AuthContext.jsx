import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useReducer } from "react";
import { auth } from "../firebase";

let AuthContext = createContext();

let AuthReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_READY":
      return { ...state, authReady: true };

    case "LOGIN":
      return { ...state, user: action.payload };

    case "LOGOUT":
      return { ...state, user: null };

    default:
      return state;
  }
};
export default function AuthContextProvider({ children }) {
  let [state, dispatch] = useReducer(AuthReducer, {
    user: null,
    authReady: false,
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("Auth State Change User: ", user);
      dispatch({ type: "AUTH_READY" });
      if (user) {
        console.log("Auth Login : ", user);
        dispatch({ type: "LOGIN", payload: user });
      } else {
        dispatch({ type: "LOGOUT" });
      }
    });
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}
export { AuthContext, AuthContextProvider };
