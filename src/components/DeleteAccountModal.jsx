import { useNavigate } from "react-router-dom";
import useFirestore from "../hooks/useFirestore";
import useTheme from "../hooks/useTheme";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { deleteObject, ref } from "firebase/storage";
import {
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
} from "firebase/auth";
import useLogin from "../hooks/useLogin";
export default function DeleteAccountModal({ setDeleteAccount }) {
  let { isDark } = useTheme();
  let { user } = useContext(AuthContext);
  let filterFavorites = null;
  let search = null;
  let selectedMonth = null;
  let selectedYear = null;

  let { getCollection } = useFirestore();
  let [password, setPassword] = useState("");
  let [errorMsg, setErrorMsg] = useState("");
  let { login } = useLogin();
  let [loading, setLoading] = useState(false);
  let photoURL = user?.photoURL;
  const { data: notes } = getCollection(
    "notes",
    ["userId", "==", user?.uid],
    filterFavorites,
    search,
    selectedMonth,
    selectedYear
  );

  let navigate = useNavigate();
  let deleteAccHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const credential = EmailAuthProvider.credential(user.email, password);

    try {
      await reauthenticateWithCredential(user, credential);
      if (user) {
        if (notes.length != 0) {
          notes.forEach(async (note) => {
            let ref = doc(db, "notes", note.id);
            await deleteDoc(ref);
          });
        }

        if (photoURL) {
          const storageRef = ref(storage, photoURL);
          if (storageRef) {
            await deleteObject(storageRef);
          }
        }

        await deleteUser(user);

        setDeleteAccount(false);
        navigate("/login");
      } else {
        setErrorMsg("Invalid Auth");
      }
    } catch (err) {
      setErrorMsg(err.message);
    }

    // let deleteuseracc = await login(user.email, password);

    setLoading(false);
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
          <div className="flex justify-center p-2 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl w-full transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div
                className={`px-4 pt-4 sm:p-6 sm:pb-4 ${
                  isDark ? "bg-cardbg" : "bg-white"
                }`}
              >
                {/* <div className="sm:flex sm:items-start"> */}
                <div className=" text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <div className=" flex justify-between items-center">
                    <h3
                      className={`text-xl font-semibold leading-6  ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                      id="modal-title"
                    >
                      <i className="bi bi-exclamation-diamond"></i> Are you sure
                      want to delete?
                    </h3>

                    <button
                      type="button"
                      onClick={() => setDeleteAccount(false)}
                      className={`close  mb-10 ${isDark ? "text-white" : ""}`}
                    >
                      <span className="text-4xl " aria-hidden="true">
                        &times;
                      </span>
                    </button>
                  </div>

                  <form className="block mx-7 " onSubmit={deleteAccHandler}>
                    <p
                      className={`my-4 ${
                        isDark ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      {" "}
                      <span className="text-red-600">*</span> Your notes will
                      also delete and cannot be restored.
                    </p>

                    {!!errorMsg && (
                      <p className="mx-5 text-red-500 text-xs italic">
                        {errorMsg}
                      </p>
                    )}
                    <input
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 my-3 leading-tight focus:outline-none focus:shadow-outline ${
                        isDark ? "!bg-transparent border-gray-400" : "bg-white"
                      }`}
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password."
                    />
                    <div
                      className={` pb-2 mt-3 sm:flex sm:flex-row ${
                        isDark ? "bg-cardbg" : "bg-white"
                      }`}
                    >
                      <button
                        type="submit"
                        className="mt-1 inline-flex w-full justify-center rounded-md bg-rose-700 px-6 py-2 text-md font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-rose-500 sm:mt-0 sm:w-auto"
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
                        Sure.
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
