import { useContext } from "react";
import useFirestore from "../hooks/useFirestore.js";
import NoteCard from "./NoteCard.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }
export default function NotesList({ setShowModal, setdeleteNoteId }) {
  let { user } = useContext(AuthContext);
  let { getCollection } = useFirestore();
  let {
    error,
    data: notes,
    loading,
  } = getCollection("notes", ["userId", "==", user.uid]);

  if (error) {
    return <p className="text-center my-3">{error}</p>;
  }

  return (
    <>
      {loading && <p className="text-center">Loading notes.....</p>}

      <div
        id="notelist"
        className="grid grid-cols-1 text-light lg:grid-cols-3 md:grid-cols-2 "
      >
        {!!notes &&
          notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              setShowModal={setShowModal}
              setdeleteNoteId={setdeleteNoteId}
            />
          ))}
      </div>
    </>
  );
}
