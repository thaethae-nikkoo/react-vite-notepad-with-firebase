import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { auth, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function useSignup() {
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);
  let uploadToFirebase = async (file) => {
    let uniqueFileName = Date.now().toString() + "_" + file.name;
    let path = "/avatars/" + uniqueFileName;
    let storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    let downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  };

  const sendVerificationEmail = async () => {
    const user = auth.currentUser;
    await sendEmailVerification(user)
      .then(() => {
        setError("Verification email sent. Please check your inbox.");
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };
  const signup = async (email, password, username, file) => {
    try {
      setLoading(true);
      let avatar_url = await uploadToFirebase(file);
      let res = await createUserWithEmailAndPassword(auth, email, password);
      await sendVerificationEmail();

      let usr = res.user;

      await updateProfile(usr, {
        displayName: username,
        photoURL: avatar_url,
      });

      setError(null);
      setLoading(false);

      return usr;
    } catch (error) {
      setError(error);
    }

    // Right
    // try {
    //   setLoading(true);
    //   let avatar_url = await uploadToFirebase(file);
    //   let res = await createUserWithEmailAndPassword(auth, email, password);

    //   let usr = res.user;

    //   await updateProfile(usr, {
    //     displayName: username,
    //     photoURL: avatar_url,
    //   });

    //   setError(null);
    //   setLoading(false);

    //   return usr;
    // } catch (e) {
    //   setLoading(false);
    //   setError(e.message);
    // }
  };
  return { error, loading, signup };
}
