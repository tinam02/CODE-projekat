// https://stackoverflow.com/questions/65505665/protected-route-with-firebase
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"; 
//https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#onauthstatechanged

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  // za private route comp, statusToggle je true dok firebase proverava da li korisnik postoji
  const [statusToggle, setStatusToggle] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        //!added else
        setLoggedIn(false);
      }
      setStatusToggle(false);
    });
  }, []);

  return { loggedIn, statusToggle };
};
