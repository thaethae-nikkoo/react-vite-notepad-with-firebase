import { useContext, useEffect, useState } from "react";
import useTheme from "../hooks/useTheme";
import useFirestore from "../hooks/useFirestore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../contexts/AuthContext";
import DiscardOrSaveModal from "../components/DiscardOrSaveModal";

export default function NoteForm() {
  let { isDark } = useTheme();
  // let [title, setTitle] = useState("");
  let [errorMessage, setErrorMessage] = useState("");
  let [note, setNote] = useState("");
  let [pin, setPin] = useState(false);
  let [favorite, setFavorite] = useState(false);
  let [isEdit, setIsEdit] = useState(false);
  let { addDocument, updateDocument } = useFirestore();
  let navigate = useNavigate();
  let { id } = useParams();
  let [editing, setEditing] = useState(false);
  let { user } = useContext(AuthContext);
  let [showDiscardOrSaveModal, setShowDiscardOrSaveModal] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      // Get note by its id
      let ref = doc(db, "notes", id);
      getDoc(ref).then((doc) => {
        if (doc.exists) {
          let { note, pin, favorite } = doc.data();
          // setTitle(title);
          setNote(note);
          setPin(pin);
          setFavorite(favorite);
        }
      });
    } else {
      setIsEdit(false);
      // setTitle("");
      setNote("");
    }
  }, []);

  // let titleInputHandler = (e) => {
  //   setErrorMessage("");
  //   if (!isEdit) {
  //     setTitle(e.target.value);
  //     setEditing(false);
  //   } else {
  //     if (title !== e.target.value) {
  //       setEditing(true);
  //       setTitle(e.target.value);
  //     }
  //   }
  // };
  let noteInputHandler = (e) => {
    setErrorMessage("");
    if (!isEdit) {
      setNote(e.target.value);
      setEditing(false);
    } else {
      if (note !== e.target.value) {
        setEditing(true);
        setNote(e.target.value);
      }
    }
  };

  let backToListHandler = () => {
    if (!isEdit) {
      if (note !== "") {
        setShowDiscardOrSaveModal(true);
      } else {
        navigate("/");
      }
    } else {
      if (editing) {
        setShowDiscardOrSaveModal(true);
      } else {
        navigate("/");
      }
    }
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    // if (title.trim() === "" && note.trim() === "") {
    //   setErrorMessage("Oops! Title and note fields cannot be left blank");
    //   return;
    // }
    // if (title.trim() === "") {
    //   setErrorMessage("Oops! Title cannot be left blank.");
    //   return;
    // } else {
    //   setErrorMessage("");
    // }

    if (note.trim() === "") {
      setErrorMessage("Oops! Note cannot be left blank.");
      return;
    } else {
      setErrorMessage("");
    }

    let data = {
      note,
      pin,
      favorite,
      userId: user.uid,
    };

    if (isEdit) {
      let updated_data = { ...data, updated_at: serverTimestamp() };
      await updateDocument("notes", id, updated_data);
      setErrorMessage("");
    } else {
      await addDocument("notes", data);
      setErrorMessage("");
    }

    await navigate("/");
  };

  // let handleClearBtn = () => {
  //   setTitle("");
  //   setNote("");
  //   setErrorMessage("");
  // };

  return (
    <>
      {showDiscardOrSaveModal && (
        <DiscardOrSaveModal
          handleSubmit={handleSubmit}
          setShowDiscardOrSaveModal={setShowDiscardOrSaveModal}
          isEdit={isEdit}
        />
      )}
      <div
        className={`py-2 rounded-md pt-3 sm:py-10 shadow-lg ${
          isDark ? "bg-cardbg border-2 border-slate-500" : "bg-white "
        }`}
      >
        <div className="mx-auto px-6 lg:px-8 ">
          {errorMessage && (
            <span className="text-sm text-red-600">{errorMessage}</span>
          )}

          <form action="" onSubmit={handleSubmit}>
            <div className="flex justify-between items-center space-x-2 mb-3 ">
              <div className="flex justify-start items-center">
                <button
                  type="button"
                  onClick={backToListHandler}
                  className="text-xl font-bold edit-del-buttonp-2rounded-lg p-2 text-gray-700 "
                >
                  <i className="bi bi-arrow-left"></i>
                </button>
                <button
                  type="submit"
                  className="text-xl edit-del-button p-2 text-primary "
                >
                  <i className="bi bi-floppy"></i>
                </button>
              </div>
            </div>
            <div className="mx-auto lg:mx-0">
              {/* <div className="border-b-[1px] border-gray-700 my-2">
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => titleInputHandler(e)}
                  className={`w-full p-2 text-xl !border-0 !shadow-none !outline-none  ${
                    isDark ? "!bg-transparent !text-white" : "!bg-white"
                  }`}
                  id=""
                  placeholder="Title"
                />
              </div> */}

              <textarea
                name="note"
                id="note"
                value={note}
                onChange={(e) => noteInputHandler(e)}
                className={`w-full p-3 min-h-[500px] border-0 outline-none text-md ${
                  isDark ? "bg-transparent text-white" : "bg-white"
                }`}
                placeholder="Write your note..."
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
