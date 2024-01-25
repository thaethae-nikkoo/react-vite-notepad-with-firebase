import { Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import { Menu } from "@headlessui/react";
import useFirestore from "../hooks/useFirestore.js";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/index.js";
import moment from "moment/moment.js";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function NoteCard({ note, setShowModal, setdeleteNoteId }) {
  let { updateDocument } = useFirestore();
  let deleteHandler = (e, deleteNoteId) => {
    e.preventDefault();
    setShowModal(true);
    setdeleteNoteId(deleteNoteId);
  };

  let pinAndUnpin = async (action, noteId) => {
    let ref = doc(db, "notes", noteId);
    await getDoc(ref).then(async (doc) => {
      if (doc.exists) {
        let currentData = doc.data();
        let updated_data = {
          ...currentData,
          pin: action === "pin" ? true : false,
        };
        await updateDocument("notes", noteId, updated_data);
      }
    });
  };

  let favAndUnfav = async (action, noteId) => {
    let ref = doc(db, "notes", noteId);
    await getDoc(ref).then(async (doc) => {
      if (doc.exists) {
        let currentData = doc.data();
        let updated_data = {
          ...currentData,
          favorite: action === "favorite" ? true : false,
        };
        await updateDocument("notes", noteId, updated_data);
      }
    });
  };

  let formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return formattedDate;
  };
  let { isDark } = useTheme();
  return (
    <>
      <Link
        to={`notes/${note.id}`}
        key={note.id}
        className="text-decoration-none"
      >
        <div
          className={`shadow-lg m-2 rounded-lg text-start  ${
            isDark
              ? "bg-cardbg border-2 border-slate-500 shadow-zinc-500/50"
              : "bg-white border border-slate-200"
          }`}
        >
          <div className="flex justify-between items-center">
            <Menu
              as="div"
              className="relative border-0 inline-block text-left"
              onClick={(e) => e.preventDefault()}
            >
              <div>
                <Menu.Button className="inline-flex w-fit justify-center items-center gap-x-1.5  px-3 py-2 text-sm border-0 font-semibold text-gray-900 ring-inset ring-gray-300 ">
                  <button
                    type="button"
                    className=" text-xl rounded-md p-2 text-rose-700 "
                  >
                    <i className="bi bi-three-dots"></i>
                  </button>
                </Menu.Button>
              </div>

              <Menu.Items
                className={`absolute left-8 top-10 z-10 mt-2 w-[250px] origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                  isDark ? "bg-cardbg border border-slate-400" : "bg-white"
                }`}
              >
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <p
                        href="#"
                        className={classNames(
                          active ? "bg-slate-100" : "text-gray-700",
                          "block px-3 py-2 text-sm",
                          isDark && !active ? "text-white" : "text-black"
                        )}
                      >
                        {!note.pin && (
                          <div onClick={() => pinAndUnpin("pin", note.id)}>
                            <i className="bi bi-pin-angle"></i> Pin note
                          </div>
                        )}
                        {note.pin && (
                          <div onClick={() => pinAndUnpin("unpin", note.id)}>
                            <i className="bi bi-pin-angle-fill"></i> Unpin note
                          </div>
                        )}
                      </p>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <p
                        href="#"
                        className={classNames(
                          active ? "bg-slate-100" : "text-gray-700",
                          "block px-3 py-2 text-sm",
                          isDark && !active ? "text-white" : "text-black"
                        )}
                      >
                        {!note.favorite && (
                          <div onClick={() => favAndUnfav("favorite", note.id)}>
                            {" "}
                            <i className="bi bi-star"></i> Mark as favorite
                          </div>
                        )}
                        {note.favorite && (
                          <div
                            onClick={() => favAndUnfav("unfavorite", note.id)}
                          >
                            {" "}
                            <i className="bi bi-star-fill"></i> Remove From
                            favorites
                          </div>
                        )}
                      </p>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>

            <div className="space-x-3 mx-3 flex justify-center items-center">
              {note.pin && (
                <span className=" text-lg text-primary">
                  <i className="bi bi-pin-angle-fill"></i>
                </span>
              )}
              {note.favorite && (
                <span className="text-rose-400  text-md">
                  <i className="bi bi-star-fill"></i>
                </span>
              )}
            </div>
          </div>

          <div className="overflow-hidden min-h-[270px]  px-6 lg:px-8">
            <div className="mx-auto  lg:mx-0">
              <h2
                className={`my-4 text-xl font-bold tracking-tight truncate sm:text-2xl ${
                  isDark ? "text-white" : "text-secondary "
                }`}
              >
                {note.title}
              </h2>

              <p className="text-sm text-primary">
                {/* Latest - {formatDate(note.updated_at?.toDate())} */}
                Latest - {moment(note.updated_at?.seconds * 1000).fromNow()}
              </p>
              <p
                className={`my-2 text-md  leading-8 min-h-[140px] ${
                  isDark ? "text-white" : "text-secondary"
                }`}
              >
                {note.note?.substring(0, 100) + "..."}
              </p>

              <div className="flex justify-start space-x-2 mb-3  ">
                <Link to={`/editnote/${note.id}`}>
                  <button
                    type="button"
                    className="edit-del-button p-2 text-white bg-primary "
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                </Link>

                <button
                  type="button"
                  onClick={(e) => deleteHandler(e, note.id)}
                  className="edit-del-button p-2 text-white bg-rose-700"
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
