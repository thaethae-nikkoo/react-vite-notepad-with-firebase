import { useContext, useEffect, useState } from "react";
import useTheme from "../hooks/useTheme";
import { AuthContext } from "../contexts/AuthContext";
import useSignup from "../hooks/useSignup";

export default function Profile() {
  let { isDark } = useTheme();
  let [username, setUsername] = useState("");
  let [file, setFile] = useState(null);
  let [newPassword, setNewPassword] = useState("");
  let [currentPassword, setCurrentPassword] = useState("");
  let [preview, setPreview] = useState("");
  let [email, setEmail] = useState("");
  let { user } = useContext(AuthContext);
  let { error, loading, signup } = useSignup();
  let [changePasswordToggle, setChangePasswordToggle] = useState(false);
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
  return (
    <>
      <div className="flex justify-center mt-7 space-x-4">
        <div
          className={`shadow-xl  rounded-lg text-start w-fit ${
            isDark
              ? "bg-cardbg border-2 border-slate-500 shadow-zinc-500/50"
              : "bg-white border border-slate-200"
          }`}
        >
          <div className="flex  justify-center my-5">
            <img
              src={user.photoURL}
              alt=""
              className="w-[200px] h-[200px] border rounded-lg "
            />
          </div>
          <div className=" mb-4 py-2 px-10">
            <p className={`text-lg ${isDark ? "text-white" : "text-dark"}`}>
              {" "}
              <i className="bi bi-person"></i>
              &nbsp; &nbsp;{user.displayName}
            </p>
            <p className={`text-lg ${isDark ? "text-white" : "text-dark"}`}>
              {" "}
              <i className="bi bi-envelope"></i>&nbsp; &nbsp;
              {user.email}
            </p>
          </div>
          <div className=" py-4 px-10 space-x-3 my-2">
            <button
              type="button"
              onClick={() => setChangePasswordToggle(true)}
              className="p-2  rounded-xl shadow-xl text-dark bg-rose-200 "
            >
              <i className="bi bi-key"></i> Change Password
            </button>

            <button
              type="button"
              onClick={() => setChangePasswordToggle(false)}
              className="p-2  rounded-xl shadow-xl text-dark bg-amber-100 "
            >
              <i className="bi bi-pencil-square"></i> Edit Profile
            </button>
          </div>
        </div>
        {!changePasswordToggle && (
          <div
            className={`w-[40%] h-fit shadow-lg p-8 d-bock  ${
              isDark
                ? "bg-cardbg border-gray-400"
                : " bg-white  shadow-zinc-500/50"
            }`}
          >
            <h1
              className={`flex font-bold justify-center text-xl ${
                isDark ? "text-white" : "text-primary"
              }`}
            >
              Edit your profile
            </h1>
            <form className="rounded px-8 pt-2 pb-1 ">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className={` appearance-none !border !border-gray-400 !shadow-md !bg-transparent  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none${
                  isDark ? "!bg-transparent border-gray-400" : "bg-white"
                }`}
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username."
              />

              <div className="mb-4">
                <label
                  className={`block  text-sm font-bold mb-2 ${
                    isDark ? "text-white" : "text-gray-700"
                  }`}
                >
                  User Avatar
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                    isDark ? "!bg-transparent border-gray-400" : "bg-white"
                  }`}
                  id="avatar"
                  type="file"
                  onChange={handleAvatarChange}
                />
              </div>
              {!!preview && (
                <div className="my-4 w-[90px] h-[90px] ">
                  <img
                    src={preview}
                    alt=""
                    className="rounded-full w-full h-full"
                  />
                </div>
              )}
              <div className="mb-4">
                <label
                  className={`block  text-sm font-bold mb-2 ${
                    isDark ? "text-white" : "text-gray-700"
                  }`}
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                    isDark ? "!bg-transparent border-gray-400" : "bg-white"
                  }`}
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email."
                />
              </div>

              <div className="flex items-center justify-between">
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
        )}

        {changePasswordToggle && (
          <div
            className={`w-[40%] h-fit shadow-lg p-8 d-bock m-auto ${
              isDark
                ? "bg-cardbg border-gray-400"
                : " bg-white  shadow-zinc-500/50"
            }`}
          >
            <h1
              className={`flex font-bold justify-center text-xl ${
                isDark ? "text-white" : "text-primary"
              }`}
            >
              Change Password
            </h1>
            <form className="rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-6">
                <label
                  className={`block  text-sm font-bold mb-2 ${
                    isDark ? "text-white" : "text-gray-700"
                  }`}
                  htmlFor="current_password"
                >
                  Current Password
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                    isDark ? "!bg-transparent border-gray-400" : "bg-white"
                  }`}
                  id="current_password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  type="password"
                  placeholder="Enter your current password."
                />
                {!!error && (
                  <p className="text-red-500 text-xs italic">{error}</p>
                )}
              </div>

              <div className="mb-6">
                <label
                  className={`block  text-sm font-bold mb-2 ${
                    isDark ? "text-white" : "text-gray-700"
                  }`}
                  htmlFor="new_password"
                >
                  New Password
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                    isDark ? "!bg-transparent border-gray-400" : "bg-white"
                  }`}
                  id="new_password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type="password"
                  placeholder="Enter your new password."
                />
                {!!error && (
                  <p className="text-red-500 text-xs italic">{error}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
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
                  Change Password
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
