import { signOut } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";

export default function useSignOut() {
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);
  
  const logOut = async () => {
    try {
      setLoading(true);
      let res = await signOut(auth);
      setLoading(false);
      setError(null);
      return res.user;
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };
  return { error, loading, logOut };
}
