import { useEffect, useState } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider
} from "firebase/auth";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (updatedDocs)=>{
    setLoading(true);
    return updateProfile(auth.currentUser, updatedDocs);
  }

  const logOut = ()=>{
    setLoading(true);
    return signOut(auth);
  }

  const googleLogin = ()=>{
    setLoading(true)
    return signInWithPopup(auth,googleProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userInfo = {
        email: currentUser?.email,
      }
      axiosPublic.post('/jwt',userInfo)
      .then(res=>{
        if(res.data.token){
          setUser(currentUser);
          setLoading(false);
          localStorage.setItem('access-token',res.data.token)
        }
      })
    });

    return () => {
      unsubscribe();
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    setUser,
    loading,
    createUser,
    loginUser,
    updateUser,
    logOut,
    googleLogin
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
