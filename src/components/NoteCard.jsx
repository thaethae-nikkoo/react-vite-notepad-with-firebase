import { Link, useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import useView from "../hooks/useView";
// import { Menu } from "@headlessui/react";
import useFirestore from "../hooks/useFirestore.js";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/index.js";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }
export default function NoteCard({ note, setShowModal, setdeleteNoteId }) {
  let { updateDocument } = useFirestore();
  let deleteHandler = (e, deleteNoteId) => {
    e.preventDefault();
    setShowModal(true);
    setdeleteNoteId(deleteNoteId);
    console.log(setdeleteNoteId);
  };

  let pinAndUnpin = async (e, action, noteId) => {
    e.preventDefault();
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

  let favAndUnfav = async (e, action, noteId) => {
    e.preventDefault();
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

  let navigate = useNavigate();
  let { isDark } = useTheme();
  let { isList } = useView();
  let isPin = note?.pin;
  let isFavorite = note?.favorite;
  let editHandler = (e, id) => {
    e.preventDefault();
    navigate("/editnote/" + id);
  };
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
          <div className="block md:flex md:justify-between">
            <div
              className={`flex ${
                isList ? " justify-start" : " justify-between"
              } items-center`}
            >
              {/* <Menu
                as="div"
                className="relative border-0 inline-block text-left"
                onClick={(e) => e.preventDefault()}
              >
                <div>
                  <Menu.Button className="text-xl rounded-md p-2 text-rose-700 inline-flex w-fit justify-center items-center gap-x-1.5  px-3 py-2  border-0 font-semibold  ring-inset ring-gray-300 ">
                    <i className="bi bi-three-dots"></i>
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
                              <i className="bi bi-pin-angle-fill"></i> Unpin
                              note
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
                            <div
                              onClick={() => favAndUnfav("favorite", note.id)}
                            >
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
              </Menu> */}

              <div className="space-x-3 mx-3 flex justify-center items-center">
                {isPin && (
                  <span
                    onClick={(e) => pinAndUnpin(e, "unpin", note.id)}
                    className=" text-lg text-primary"
                  >
                    <i className="bi bi-pin-angle-fill"></i>
                  </span>
                )}
                {isFavorite && (
                  <span
                    onClick={(e) => favAndUnfav(e, "unfavorite", note.id)}
                    className="text-rose-400  text-md"
                  >
                    <i className="bi bi-star-fill"></i>
                  </span>
                )}

                {!isPin && (
                  <span
                    onClick={(e) => pinAndUnpin(e, "pin", note.id)}
                    className=" text-lg text-primary"
                  >
                    <i className="bi bi-pin-angle"></i>
                  </span>
                )}
                {!isFavorite && (
                  <span
                    onClick={(e) => favAndUnfav(e, "favorite", note.id)}
                    className="text-rose-400  text-md"
                  >
                    <i className="bi bi-star"></i>
                  </span>
                )}
              </div>
            </div>

            {/* <div className="px-6 md:py-2">
              <p
                className={`text-sm text-primary ${
                  isList ? "inline" : "hidden"
                }`}
              >
                Latest updated -{" "}
                {moment(note.updated_at?.seconds * 1000).fromNow()}
              </p>
            </div> */}
          </div>

          <div
            className={`overflow-hidden  px-6 lg:px-8 ${
              isList ? "md:max-h-[70px] max-h-[160px]" : " min-h-[163px]"
            }`}
          >
            <div
              className={`${
                isList
                  ? "md:flex md:justify-between block justify-start"
                  : "mx-auto lg:mx-0"
              }`}
            >
              <div>
                <p
                  className={`  my-2 text-md ${
                    isList ? "mx-5 px-4" : ""
                  } leading-8 md:min-h-[10px] ${
                    isDark ? "text-white" : "text-dark"
                  }`}
                >
                  <span
                    className="hidden sm:inline-block"
                    dangerouslySetInnerHTML={{
                      __html: note.note?.substring(0, 130) + "...",
                    }}
                  />

                  <span
                    className="inline-block sm:hidden"
                    dangerouslySetInnerHTML={{
                      __html: note.note?.substring(0, 130) + "...",
                    }}
                  />
                  {/* {note.note?.substring(0, 100) + "..."} */}
                </p>
              </div>

              <div
                className={`flex  justify-start ${
                  isList ? "md:space-y-3 md:block space-x-3 " : "  space-x-2"
                }  mb-3 `}
              >
                <button
                  type="button"
                  onClick={(e) => editHandler(e, note.id)}
                  className=" h-fit p-2 md:mx-0 mx-2 text-white rounded-lg bg-primary"
                >
                  <i className="bi bi-pencil-square"></i>
                </button>

                <button
                  type="button"
                  onClick={(e) => deleteHandler(e, note.id)}
                  className=" h-fit p-2 md:mx-0 mx-2 text-white rounded-lg bg-rose-700"
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
