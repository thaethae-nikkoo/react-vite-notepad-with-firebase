import { useContext, useEffect, useState } from "react";
import useTheme from "../hooks/useTheme";
import { AuthContext } from "../contexts/AuthContext";
import { sendEmailVerification, updateProfile } from "firebase/auth";

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../firebase";
export default function ProfileInfo({ setProfileInfo }) {
  let { isDark } = useTheme();
  let { user } = useContext(AuthContext);
  let [username, setUsername] = useState(user.displayName);
  let [photoURL, setphotoURL] = useState(user.photoURL);
  let [file, setFile] = useState(null);
  let [message, setMessage] = useState("");
  let [error, setError] = useState("");

  let [preview, setPreview] = useState("");
  let [loading, setLoading] = useState(false);
  let handleAvatarChange = (e) => {
    setFile(e.target.files[0]);
  };

  let handlePreviewAvatar = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPreview(reader.result);
    };
  };

  useEffect(() => {
    if (file) {
      handlePreviewAvatar(file);
    }
  }, [file]);

  let uploadToFirebase = async (file) => {
    let uniqueFileName = Date.now().toString() + "_" + file.name;
    let path = "/avatars/" + uniqueFileName;
    let storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);

    let downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (file) {
      let avatar_url = await uploadToFirebase(file);
      await updateProfile(user, {
        displayName: username,
        photoURL: avatar_url,
      });
    } else {
      await updateProfile(user, {
        displayName: username,
        photoURL: photoURL,
      });
    }

    if (photoURL) {
      const storageRef = ref(storage, photoURL);
      if (storageRef) {
        await deleteObject(storageRef);
      }
    }
    setMessage("Successfully Updated.");
    setLoading(false);
  };

  let verifyEmailProcess = async (e) => {
    e.preventDefault();

    await sendEmailVerification(user)
      .then(() => {
        
        setMessage(
          "Verification email sent. Please check your inbox." + user.email
        );
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
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
                    <div className="mx-auto flex h-12 w-11 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
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
                        Profile Settings
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setProfileInfo(false);
                    }}
                  >
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
                  <div
                    className={`mt-3 text-center border-b-2  ${
                      isDark ? "border-gray-600" : "border-gray-200"
                    }  sm:mt-0 sm:text-left`}
                  >
                    <p
                      className={`text-base sm:ml-4 my-4 leading-6  ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                      id="modal-title"
                    >
                      You can update the username and avatar by editing this
                      fields
                    </p>
                  </div>

                  <div>
                    {!!message && (
                      <p className="text-center text-primary text-sm">
                        {message}
                      </p>
                    )}
                    {!!error && (
                      <p className="text-center text-red-600 text-sm">
                        {error}
                      </p>
                    )}
                  </div>

                  <p
                    className={` appearance-none !border-0 text-center !bg-transparent  rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none${
                      isDark
                        ? "!bg-transparent !text-white border-gray-400"
                        : "text-gray-700  bg-white"
                    }`}
                  >
                    {!user.emailVerified && (
                      <>
                        <span className="rounded-lg text-xs text-white px-2 bg-red-600">
                          Unverified
                        </span>
                      </>
                    )}
                    {user.emailVerified && (
                      <span className="rounded-lg text-xs text-white px-2 bg-primary">
                        Verified
                      </span>
                    )}{" "}
                    &nbsp;
                    {user.email}{" "}
                    {!user.emailVerified && (
                      <span
                        onClick={verifyEmailProcess}
                        className="cursor-pointer text-xs text-red-600"
                      >
                        Verify My Email
                      </span>
                    )}
                  </p>

                  <form
                    action=""
                    onSubmit={handleSubmit}
                    className="block mx-7"
                  >
                    <div>
                      <input
                        className={` appearance-none !border-0 !shadow-md !bg-transparent  rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none${
                          isDark
                            ? "!bg-transparent !text-white border-gray-400"
                            : "text-gray-700  bg-white"
                        }`}
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-center items-center space-x-3">
                      <div className="">
                        {!!preview && (
                          <img
                            src={preview}
                            className="  w-[90px] !h-[90px] rounded-full"
                            alt=""
                          />
                        )}
                        {!preview && (
                          <img
                            src={photoURL}
                            className="  w-[90px] !h-[90px] rounded-full"
                            alt=""
                          />
                        )}
                      </div>
                      <div>
                        <input
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                            isDark
                              ? "!bg-transparent border-gray-400"
                              : "bg-white"
                          }`}
                          type="file"
                          onChange={handleAvatarChange}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
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
                        )}
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
