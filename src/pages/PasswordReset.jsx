// import { Link, useNavigate } from "react-router-dom";
import {
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
} from "firebase/auth";
import useTheme from "../hooks/useTheme";
import { useState } from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

export default function PasswordReset() {
  let { isDark } = useTheme();
  let [email, setEmail] = useState("");
  let [resetSent, setResetSent] = useState(false);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);

  //   Right Res
  let passwordResetHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    await sendPasswordResetEmail(auth, email)
      .then((response) => {
        console.log(response);
        setResetSent("Password reset email sent. Check your inbox.");
      })
      .catch((error) => {
        setError(error.message);
      });

    setLoading(false);
  };

  return (
    <>
      <div
        className={`w-full max-w-lg shadow-lg p-8 d-bock m-auto mt-10 ${
          isDark ? "bg-cardbg border-gray-400" : " bg-white  shadow-zinc-500/50"
        }`}
      >
        <h1
          className={`flex  my-4 font-bold justify-center text-2xl ${
            isDark ? "text-white" : "text-primary"
          }`}
        >
          Password Reset
        </h1>

        {resetSent && (
          <p className="text-primary text-center mt-3">
            Password reset email sent. Check your inbox.
          </p>
        )}
        {error && <p className="text-red-600 text-center my-3">{error}</p>}

        <form
          className="rounded px-8 pt-6 pb-8 "
          onSubmit={passwordResetHandler}
        >
          <div className="mb-4">
            <label
              className={`block  text-sm font-bold mb-2 ${
                isDark ? "text-white" : "text-gray-700"
              }`}
              htmlFor="email"
            >
              Enter your email for the reset link.
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700  leading-tight focus:outline-none focus:shadow-outline ${
                isDark ? "!bg-transparent border-gray-400" : "bg-white"
              }`}
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <span className="text-sm my-2 text-gray-500">
              To received reset link, please provide a registered email address.
            </span>
          </div>

          <div className="flex  items-center justify-start space-x-4">
            <button
              className="bg-primary mt-2 flex justify-center items-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
              Send
            </button>
          </div>
        </form>
        <p
          className={`text-sm text-center ${
            isDark ? "text-white" : "text-primary "
          }`}
        >
          <span className="underline decoration-solid">
            {" "}
            <Link to="/login"> Back to Login</Link>{" "}
          </span>
        </p>
      </div>
    </>
  );
}
