import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import Navbar from "../components/Navbar";
import "./style.css";
import useTheme from "../hooks/useTheme";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import DialogBox from "../components/DialogBox";
import ProfileInfo from "../components/ProfileInfo";
import PasswordChangeDialog from "../components/PasswordChangeDialog";

import ChangeEmailDialogbox from "../components/changeEmailDialogbox";
import DeleteAccountModal from "../components/DeleteAccountModal";

function Layout({ photoExist }) {
  let location = useLocation();
  let { isDark } = useTheme();
  let [showDialog, setShowDialog] = useState(false);
  let [profileInfo, setProfileInfo] = useState(false);
  let [passwordChange, setPasswordChange] = useState(false);
  let [emailChange, setEmailChange] = useState(false);
  let [deleteAccount, setDeleteAccount] = useState(false);

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
      {showDialog && (
        <DialogBox
          showDialog={showDialog}
          setEmailChange={setEmailChange}
          setShowDialog={setShowDialog}
          setPasswordChange={setPasswordChange}
          setDeleteAccount={setDeleteAccount}
        />
      )}
      {profileInfo && (
        <ProfileInfo
          profileInfo={profileInfo}
          setProfileInfo={setProfileInfo}
        />
      )}
      {passwordChange && (
        <PasswordChangeDialog
          setPasswordChange={setPasswordChange}
          setShowDialog={setShowDialog}
        />
      )}

      {emailChange && (
        <ChangeEmailDialogbox
          setEmailChange={setEmailChange}
          setShowDialog={setShowDialog}
        />
      )}

      {deleteAccount && (
        <DeleteAccountModal setDeleteAccount={setDeleteAccount} />
      )}

      <Navbar
        setShowDialog={setShowDialog}
        photoExist={photoExist}
        setProfileInfo={setProfileInfo}
      />

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
