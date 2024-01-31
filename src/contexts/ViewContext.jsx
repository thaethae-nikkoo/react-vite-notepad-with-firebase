import { createContext, useReducer } from "react";

const ViewContext = createContext();
let ViewReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_VIEW":
      return { ...state, view: action.payload };
    default:
      return state;
  }
};
const ViewContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ViewReducer, { view: "grid" });

  const isList = state.view === "list";

  let changeView = (view) => {
    dispatch({ type: "CHANGE_VIEW", payload: view });
  };

  return (
    <ViewContext.Provider value={{ ...state, changeView, isList }}>
      {children}
    </ViewContext.Provider>
  );
};

export { ViewContext, ViewContextProvider };
