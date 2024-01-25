import { Outlet, useLocation } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import Navbar from "../components/Navbar";
import "./style.css";
import useTheme from "../hooks/useTheme";
import { useEffect } from "react";
import Footer from "../components/Footer";

function Layout() {
  let location = useLocation();
  let { isDark } = useTheme();
  useEffect(() => {
    let body = document.body;
    if (isDark) {
      body.classList.add("bg-dbodybg");
    } else {
      body.classList.remove("bg-dbodybg");
    }
  }, [isDark]);
  return (
    <div className={`p-3 min-h-screen`}>
      <Navbar />

      <SwitchTransition>
        <CSSTransition timeout={200} classNames="fade" key={location.pathname}>
          <div className="page">
            <Outlet />
          </div>
        </CSSTransition>
      </SwitchTransition>

      <Footer />
    </div>
  );
}
export default Layout;
