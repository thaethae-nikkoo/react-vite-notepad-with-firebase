import { useContext, useEffect, useState } from "react";
import useTheme from "../hooks/useTheme";
import useFirestore from "../hooks/useFirestore";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../contexts/AuthContext";

export default function NoteForm() {
  let { isDark } = useTheme();
  let [title, setTitle] = useState("");
  let [note, setNote] = useState("");
  let [pin, setPin] = useState(false);
  let [favorite, setFavorite] = useState(false);
  let [isEdit, setIsEdit] = useState(false);
  let { addDocument, updateDocument } = useFirestore();
  let navigate = useNavigate();
  let { id } = useParams();
  let { user } = useContext(AuthContext);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      // Get note by its id
      let ref = doc(db, "notes", id);
      getDoc(ref).then((doc) => {
        if (doc.exists) {
          let { title, note, pin, favorite } = doc.data();
          setTitle(title);
          setNote(note);
          setPin(pin);
          setFavorite(favorite);
        }
      });
    } else {
      setIsEdit(false);
      setTitle("");
      setNote("");
    }
  }, []);

  let handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      title,
      note,
      pin,
      favorite,
      userId: user.uid,
    };

    if (isEdit) {
      let updated_data = { ...data, updated_at: serverTimestamp() };
      await updateDocument("notes", id, updated_data);
    } else {
      await addDocument("notes", data);
    }

    await navigate("/");
  };

  let handleClearBtn = () => {
    setTitle("");
    setNote("");
  };

  return (
    <>
      <div
        className={`py-2 rounded-md pt-3 sm:py-10 shadow-lg ${
          isDark ? "bg-cardbg border-2 border-slate-500" : "bg-white "
        }`}
      >
        <div className="mx-auto px-6 lg:px-8 ">
          <form action="" onSubmit={handleSubmit}>
            <div className="flex justify-start items-center space-x-2 mb-3 ">
              <button
                type="submit"
                className="text-xl edit-del-button p-2 text-primary "
              >
                <i className="bi bi-floppy"></i>
              </button>

              <button
                type="button"
                onClick={handleClearBtn}
                className="text-xl edit-del-button p-2 text-rose-600"
              >
                <i className="bi bi-x-square"></i>
              </button>
            </div>
            <div className="mx-auto lg:mx-0">
              <div className="border-b-[1px] border-gray-700 my-2">
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`w-full p-2 text-xl !border-0 !shadow-none !outline-none  ${
                    isDark ? "!bg-transparent" : "!bg-white"
                  }`}
                  id=""
                  placeholder="Title"
                />
              </div>

              <textarea
                name="note"
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
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
