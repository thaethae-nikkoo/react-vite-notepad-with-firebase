import { useNavigate } from "react-router-dom";
import useFirestore from "../hooks/useFirestore";
import useTheme from "../hooks/useTheme";

export default function Modal({ deleteNoteId, setShowModal }) {
  let { isDark } = useTheme();

  let { deleteDocument } = useFirestore();

  let navigate = useNavigate();

  let deleteNoteHandler = async (id) => {
    setShowModal(false);
    await deleteDocument("notes", id);

    navigate("/");
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
                      className={`close  mb-10 ${isDark ? "text-white" : ""}`}
                      onClick={() => setShowModal(false)}
                    >
                      <span className="text-4xl " aria-hidden="true">
                        &times;
                      </span>
                    </button>
                  </div>

                  <div
                    className={` pb-2 mt-3 sm:flex sm:flex-row ${
                      isDark ? "bg-cardbg" : "bg-white"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => deleteNoteHandler(deleteNoteId)}
                      className="mt-1 inline-flex w-full justify-center rounded-md bg-rose-700 px-6 py-2 text-md font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-rose-500 sm:mt-0 sm:w-auto"
                    >
                      Sure.
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
