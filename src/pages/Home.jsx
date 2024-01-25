import NotesList from "../components/NotesList";
import FilterNote from "../components/FilterNote";
import "../../src/App.css";

import Modal from "../components/Modal";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  let [showModal, setShowModal] = useState(false);
  let [deleteNoteId, setdeleteNoteId] = useState(null);
  return (
    <>
      {showModal && (
        <Modal deleteNoteId={deleteNoteId} setShowModal={setShowModal}></Modal>
      )}

      <div className="flex flex-wrap justify-start space-x-3 my-10 items-center">
        <Link to="/writenote">
          <button
            type="button"
            className="p-2  my-2 x-3 rounded-xl shadow-xl text-white bg-primary "
          >
            <i className="bi bi-pen"></i> Write note
          </button>
        </Link>

        <button
          type="button"
          className="p-2 my-2 x-3 rounded-xl shadow-xl text-dark bg-rose-200 "
        >
          <i className="bi bi-star"></i> Favorites
        </button>

        <FilterNote />

        <div className="flex space-x-2 m-2 bg-white shadow-md justify-around items-center border border-1 w-full py-1 px-2 rounded-lg md:w-[350px]">
          <input
            type="text"
            placeholder="search note..."
            className="!outline-none !border-0 !bg-transparent py-1 rounded-lg"
          />

          <button className="text-dark search-btn flex items-center gap-1 rounded-2xl px-1 py-1 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
      </div>

      <NotesList
        setShowModal={setShowModal}
        setdeleteNoteId={setdeleteNoteId}
      />
    </>
  );
}
