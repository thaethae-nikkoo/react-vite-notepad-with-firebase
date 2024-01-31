import { useContext, useState } from "react";
import useFirestore from "../hooks/useFirestore.js";
import NoteCard from "./NoteCard.jsx";
import Pagination from "./Pagination.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";
import useView from "../hooks/useView.js";
export default function NotesList({
  setShowModal,
  setdeleteNoteId,
  filterFavorites,
  search,
  selectedDate,
}) {
  const { user } = useContext(AuthContext);

  const selectedMonth = selectedDate.split("-")[1]; // Extract month from selectedDate
  const selectedYear = selectedDate.split("-")[0]; // Extract year from selectedDate

  let { getCollection } = useFirestore();
  let { isDark } = useContext(AuthContext);
  let { isList } = useView();

  const {
    error,
    data: allNotes,
    loading,
  } = getCollection(
    "notes",
    ["userId", "==", user.uid],
    filterFavorites,
    search,
    selectedMonth,
    selectedYear
  );

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = isList ? 5 : 9;

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const notes = allNotes.slice(indexOfFirstNote, indexOfLastNote);

  // Logic to calculate total number of pages
  const totalPages = Math.ceil(allNotes.length / notesPerPage);

  // Function to handle pagination navigation
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const highlightSearch = (text, searchTerm) => {
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(
      regex,
      "<mark style='background-color: rgba(2,132,199, 0.3);'>$1</mark>"
    );
  };

  return (
    <>
      {error && <p className={`text-center text-primary my-3 `}>{error}</p>}
      {loading && <p className="text-center">Loading notes.....</p>}

      {!loading && !error && (
        <div>
          {!filterFavorites && !search && !selectedDate && (
            <p className="text-center text-primary">
              All of your notes are listed without filter.
            </p>
          )}

          {filterFavorites || search || selectedDate ? (
            <p className="text-center text-primary">
              All of your notes {filterFavorites ? "by your favorites ," : ""}{" "}
              {search ? "by your search words " + "'" + search + "'" : ""}
              {selectedDate
                ? "within " + months[selectedMonth - 1] + "-" + selectedYear
                : ""}{" "}
              are listed.
            </p>
          ) : null}
        </div>
      )}

      <div
        id="notelist"
        className={`grid grid-cols-1 text-light ${
          isList
            ? "lg:grid-cols-1 md:grid-cols-1"
            : " lg:grid-cols-3 md:grid-cols-2 "
        }`}
      >
        {!!notes &&
          notes.map((note) => (
            <NoteCard
              key={note.id}
              note={{
                ...note,
                note: search
                  ? highlightSearch(
                      note.note.length > 130
                        ? note.note.substring(0, 130)
                        : note.note,
                      search
                    )
                  : note.note,
              }}
              setShowModal={setShowModal}
              setdeleteNoteId={setdeleteNoteId}
            />
          ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
        goToPage={goToPage}
      />
    </>
  );
}
