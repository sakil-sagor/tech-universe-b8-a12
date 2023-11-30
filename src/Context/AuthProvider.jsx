import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/Firebase.config";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [disName, setDisName] = useState("");

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // google loign function
  const googleLogin = () => {
    const googleProvider = new GoogleAuthProvider();
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const getDisName = (event) => {
    setDisName(event.target.value);
  };

  const updateProfileName = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // get the current sign in user and toogle login register button
  // useEffect(() => {
  //   setLoading(true);
  //   const unsubscribed = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // const uid = user.uid;
  //       setUser(user);
  //     } else {
  //       setUser({});
  //     }
  //     setLoading(false);
  //   });
  //   return () => unsubscribed;
  // }, []);

  const saveUser = (displayName, email, method) => {
    const user = { name: displayName, email: email, role: "" };
    fetch("https://tech-server-12.vercel.app/user", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then();
  };

  const authInfo = {
    user,
    loading,
    createUser,
    googleLogin,
    signIn,
    disName,
    setUser,
    logOut,
    darkMode,
    toggleDarkMode,
    getDisName,
    saveUser,
    updateProfileName,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
