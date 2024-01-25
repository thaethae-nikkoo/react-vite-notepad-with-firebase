import useFirestore from "../hooks/useFirestore";
import { Link, useParams } from "react-router-dom";
import useTheme from "../hooks/useTheme";

import Modal from "../components/Modal";
import { useState } from "react";
import moment from "moment";

export default function NoteDetail() {
  let { isDark } = useTheme();
  let { id } = useParams();
  let { getDocument } = useFirestore();
  let { error, data: note, loading } = getDocument("notes", id);
  let [showModal, setShowModal] = useState(false);
  let [deleteNoteId, setdeleteNoteId] = useState(null);
  let deleteHandler = (e, deleteNoteId) => {
    e.preventDefault();
    setShowModal(true);
    setdeleteNoteId(deleteNoteId);
  };

  return (
    <>
      {showModal && (
        <Modal deleteNoteId={deleteNoteId} setShowModal={setShowModal}></Modal>
      )}

      {!!error && (
        <div className="my-6 min-h-80">
          <p className={` text-center ${isDark ? "text-white" : "text-dark"}`}>
            {error}
          </p>
        </div>
      )}
      {loading && <p>Loading....</p>}
      {!!note && (
        <div
          className={`note-detail space-y-10 py-10 w-[100%] mx-auto rounded px-5 ${
            isDark ? "bg-cardbg border-2 shadow-xl  border-slate-500" : ""
          }`}
        >
          <h2
            className={`text-xl tracking-wide font-bold ${
              isDark ? "text-white" : ""
            }`}
          >
            {note.title}
          </h2>
          <p
            className={`text-md px-10 tracking-wide  ${
              isDark ? "text-gray-300" : ""
            }`}
          >
            {note.note}
          </p>

          <div className="space-y-2">
            <p
              className={`text-xs ${
                isDark ? "text-gray-500" : "text-gray-500"
              }`}
            >
              Created at - {moment(note.created_at?.toDate()).format("lll")}
            </p>

            <p
              className={`text-xs ${
                isDark ? "text-gray-500" : "text-gray-500"
              }`}
            >
              Latest Updated - {moment(note.updated_at?.toDate()).format("lll")}
            </p>
          </div>

          <div className="flex justify-start items-center space-x-2 my-10 ">
            <Link to={`/editnote/${id}`}>
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

            {/* <button
              type="button"
              className=" rounded-md border border-slate-400 p-2 text-rose-700  bg-white"
            >
              <i className="bi bi-star-fill"></i>
            </button> */}
          </div>
        </div>
      )}
    </>
  );
}
