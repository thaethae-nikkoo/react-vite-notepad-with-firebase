import { Link, useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import { useState } from "react";
import useLogin from "../hooks/useLogin";

export default function Login() {
  let { isDark } = useTheme();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let { error, loading, login } = useLogin();
  let navigate = useNavigate();
  let loginUser = async (e) => {
    e.preventDefault();
    let user = await login(email, password);

    if (user) {
      navigate("/");
    }
  };
  return (
    <>
      <div
        className={`w-full max-w-lg shadow-lg p-8 d-bock m-auto mt-7 ${
          isDark ? "bg-cardbg border-gray-400" : " bg-white  shadow-zinc-500/50"
        }`}
      >
        <h1
          className={`flex  my-4 font-bold justify-center text-2xl ${
            isDark ? "text-white" : "text-primary"
          }`}
        >
          Login
        </h1>
        <form
          className="rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={(e) => loginUser(e)}
        >
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
          <div className="mb-6">
            <label
              className={`block  text-sm font-bold mb-2 ${
                isDark ? "text-white" : "text-gray-700"
              }`}
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                isDark ? "!bg-transparent border-gray-400" : "bg-white"
              }`}
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password."
            />
            {!!error && <p className="text-red-500 text-xs italic">{error}</p>}
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
              Login
            </button>
          </div>
        </form>

        <p
          className={`text-sm text-center ${
            isDark ? "text-white" : "text-primary "
          }`}
        >
          Does not have account ?{" "}
          <span className="underline decoration-solid">
            {" "}
            <Link to="/register"> Go Register</Link>{" "}
          </span>
        </p>
      </div>
    </>
  );
}
