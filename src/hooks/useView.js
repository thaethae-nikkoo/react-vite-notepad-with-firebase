import { useContext } from "react";
import { ViewContext } from "../contexts/ViewContext";

export default function useTheme() {
  let context = useContext(ViewContext);
  if (context === undefined) {
    new Error("ViewContext should be only used in view context provider");
  }
  return context; //return view , changeView()
}
