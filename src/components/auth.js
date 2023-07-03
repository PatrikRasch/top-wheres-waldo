import { useState } from "react";
import { auth, googleProvider } from "../../firebase.config";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  // signInWithPopup is the classic Google popup login service
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err); // console.error(err) shows our error in a more readable way
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={signIn}>Sign In</button>
      <button onClick={signInWithGoogle}>Sign In With Google</button>

      <button onClick={logout}>Log out</button>
    </div>
  );
};
