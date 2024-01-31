import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";

export default function useFirestore() {
  // Get all documents from a collection => getCollection()

  let getCollection = (
    collectionName,
    _q,
    filterFavorites,
    search,
    selectedMonth,
    selectedYear
  ) => {
    let [error, setError] = useState("");

    let [data, setData] = useState([]);

    let [loading, setLoading] = useState(false);

    let qRef = useRef(_q).current;

    useEffect(() => {
      setLoading(true);

      let ref = collection(db, collectionName);
      let queries = [];
      if (qRef) {
        queries.push(where(...qRef));
      }

      if (filterFavorites !== null) {
        queries.push(where("favorite", "==", filterFavorites));
      }
      if (selectedMonth && selectedYear) {
        const startOfMonth = new Date(selectedYear, selectedMonth - 1, 1);
        const endOfMonth = new Date(selectedYear, selectedMonth, 1);
        console.log(startOfMonth);
        queries.push(
          where("created_at", ">=", startOfMonth),
          where("created_at", "<=", endOfMonth),
          orderBy("created_at", "desc")
        );
      }

      queries.push(orderBy("pin", "desc"), orderBy("updated_at", "desc"));
      let q = query(ref, ...queries);

      onSnapshot(q, (docs) => {
        if (docs.empty) {
          setError("No data found.");
          setLoading(false);
        } else {
          let collectionDatas = [];
          docs.forEach((doc) => {
            let document = { id: doc.id, ...doc.data() };
            collectionDatas.push(document);
          });
          if (search) {
            collectionDatas = collectionDatas.filter((note) =>
              note.note.toLowerCase().includes(search.toLowerCase())
            );
          }

          setData(collectionDatas);
          setLoading(false);
          setError("");
        }
      });
    }, [
      collectionName,
      qRef,
      filterFavorites,
      search,
      selectedMonth,
      selectedYear,
    ]);
    return { error, data, loading };
  };
  //   Get A Document from a collection => getDocument()

  let getDocument = (collectionName, id) => {
    let [error, setError] = useState("");
    let [loading, setLoading] = useState(false);
    let [data, setData] = useState(null);

    useEffect(() => {
      setLoading(true);
      let ref = doc(db, collectionName, id);

      onSnapshot(ref, (doc) => {
        if (doc.exists()) {
          let d = { id: doc.id, ...doc.data() };
          setData(d);
          setLoading(false);
          setError("");
        } else {
          setError("No Document Found with this ID.");
          setLoading(false);
        }
      });
    }, [collectionName, id]);

    return { error, data, loading };
  };

  // Add a document to a collection => addDocument()

  let addDocument = async (documentName, data) => {
    data.created_at = serverTimestamp();
    data.updated_at = serverTimestamp();
    let ref = collection(db, documentName);
    return addDoc(ref, data);
  };

  // Edit a document from a collection => UpdateDocument()

  let updateDocument = async (documentName, id, data) => {
    // data.updated_at = serverTimestamp();
    let ref = doc(db, documentName, id);
    return updateDoc(ref, data);
  };

  // Delete a document from a collection => deleteDocument()
  let deleteDocument = async (documentName, id) => {
    let ref = doc(db, documentName, id);
    return deleteDoc(ref);
  };
  return {
    getCollection,
    getDocument,
    addDocument,
    updateDocument,
    deleteDocument,
  };
}
