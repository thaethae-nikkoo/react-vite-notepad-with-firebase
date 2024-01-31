import { useContext, useState } from "react";
import useTheme from "../hooks/useTheme";
import { AuthContext } from "../contexts/AuthContext";
import useSignOut from "../hooks/useSignOut";

import { useNavigate } from "react-router-dom";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  updateEmail,
} from "firebase/auth";

export default function ChangeEmailDialogbox({
  setShowDialog,
  setEmailChange,
}) {
  let { user } = useContext(AuthContext);
  let { isDark } = useTheme();
  let [error, setError] = useState(null);
  let [currentPassword, setCurrentPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [message, setMessage] = useState("");
  let [newEmail, setNewEmail] = useState("");
  let { logOut } = useSignOut();
  let navigate = useNavigate();
  let logoutUser = async (e) => {
    e.preventDefault();
    await logOut();
    setEmailChange(false);
    setShowDialog(false);
    navigate("/login");
  };
  let later = () => {
    setEmailChange(false);
    setShowDialog(false);
  };

  let changeEmailHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const credential = await EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      await reauthenticateWithCredential(user, credential);
      console.log("User reauthenticated successfully");

      //  proceed with email update
      await updateEmail(user, newEmail);
      console.log("Email updated successfully");

      setMessage("Email changed successfully.");

      setLoading(false);
    } catch (error) {
      console.error("Error occurred:", error.message);
      setError("Failed to change email. Please try again.");

      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div
              className={` relative transform overflow-hidden rounded-lg  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg ${
                isDark ? "bg-cardbg" : "bg-white"
              }`}
            >
              <div
                className={` ${
                  isDark ? "bg-cardbg" : "bg-white"
                } pb-4 pt-5  sm:pb-4`}
              >
                <div
                  className={`sm:flex sm:items-center justify-between border-b-2 px-4 sm:px-6 ${
                    isDark ? "border-gray-600" : "border-gray-200"
                  } py-2`}
                >
                  <div className="sm:flex sm:items-center ">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg
                        className="text-red-600 w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3
                        className={`text-base font-semibold leading-6 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                        id="modal-title"
                      >
                        Change Your Authenticated Email
                      </h3>
                    </div>
                  </div>
                  <button onClick={() => setEmailChange(false)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke={isDark ? "white " : "currentColor "}
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="space-y-5 mt-5">
                  {!!error && (
                    <p className="mx-5 text-red-500 text-xs italic">{error}</p>
                  )}

                  {!!message && (
                    <p className="mx-5 text-primary  text-center font-bold text-sm italic">
                      {message}
                      <span
                        className="underline mx-2 cursor-pointer"
                        onClick={logoutUser}
                      >
                        {" "}
                        Logout Now?
                      </span>
                      or
                      <span
                        className="underline mx-2 cursor-pointer"
                        onClick={later}
                      >
                        {" "}
                        Later
                      </span>
                    </p>
                  )}
                  <form className="block mx-7" onSubmit={changeEmailHandler}>
                    <div className="mb-6 px-5">
                      <input
                        className={`shadow appearance-none !border-0 !border-b !border-b-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                          isDark
                            ? "!bg-transparent !text-white border-gray-400"
                            : "bg-white"
                        }`}
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Current password."
                      />
                    </div>
                    <div className="mb-6 px-5">
                      <input
                        className={`shadow appearance-none !border-0 !border-b !border-b-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                          isDark
                            ? "!bg-transparent border-gray-400"
                            : "bg-white"
                        }`}
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="Enter your new email."
                      />
                    </div>

                    {/* <p className="mx-5 text-red-500 text-xs italic">

                        <span
                          className="underline cursor-pointer"
                          onClick={logoutUser}
                        >
                          Logout
                        </span>
                      </p> */}

                    <div className="flex justify-end px-5">
                      <button
                        className="bg-primary flex justify-center items-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        {loading && (
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        )}{" "}
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
