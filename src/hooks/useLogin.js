import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";

export default function useLogin() {
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);
  let login = async (email, password) => {
    try {
      setLoading(true);
      let res = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      return res.user;
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };
  return { error, loading, login };
}
