import NotesList from "../components/NotesList";

import "../../src/App.css";

import Modal from "../components/Modal";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  let [showModal, setShowModal] = useState(false);

  let [deleteNoteId, setdeleteNoteId] = useState(null);
  let [filterFavorites, setFilterFavorites] = useState(null);

  let [selectedDate, setSelectedDate] = useState("");
  let [search, setSearch] = useState("");
  let searchHandler = (e) => {
    e.preventDefault();
    setSearch(search);
  };

  let allNoteShow = () => {
    setFilterFavorites(null);
    setSearch("");
    setSelectedDate("");
  };

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
          onClick={() => setFilterFavorites(true)}
          className="p-2 my-2 x-3 rounded-xl shadow-xl text-dark bg-rose-200 "
        >
          <i className="bi bi-star"></i> Favorites
        </button>

        <button
          type="button"
          onClick={allNoteShow}
          className="p-2 my-2 x-3 rounded-xl shadow-xl text-dark bg-amber-100 "
        >
          <i className="bi bi-journals"></i> All Notes
        </button>

        <div className="flex bg-transparent my-2 justify-start space-x-6 items-center">
          <span className="text-primary">
            Filter By <i className="bi bi-calendar-month"></i> :
          </span>

          <div className="flex space-x-2 my-2 bg-white shadow-md justify-around items-center border border-1 py-1 px-2 rounded-lg ">
            <input
              type="month"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="outline-none bg-transparent border-0 border-bottom-2 py-1 rounded-lg"
            />
          </div>
        </div>

        <form
          onSubmit={(e) => searchHandler(e)}
          className="flex space-x-2 m-2 bg-white shadow-md justify-around items-center border border-1 w-full py-1 px-2 rounded-lg md:w-[350px]"
        >
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="search note..."
            className="!outline-none !border-0 !bg-transparent py-1 rounded-lg"
          />

          <button
            type="submit"
            className="text-dark search-btn flex items-center gap-1 rounded-2xl px-1 py-1 "
          >
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
        </form>
      </div>

      <NotesList
        setShowModal={setShowModal}
        search={search}
        filterFavorites={filterFavorites}
        selectedDate={selectedDate}
        setdeleteNoteId={setdeleteNoteId}
      />
    </>
  );
}
