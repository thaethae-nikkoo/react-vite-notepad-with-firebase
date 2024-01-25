import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function useTheme() {
  let context = useContext(ThemeContext);
  if (context === undefined) {
    new Error("ThemeContext should be only used in theme context provider");
  }
  return context; //return theme , changeTheme()
}
