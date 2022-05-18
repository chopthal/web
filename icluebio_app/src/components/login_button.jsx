import React from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import firebaseApp from "../service/firebase"; // For Initilization

const LoginButton = (props) => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const onGoogleLogin = () => {
    signInWithPopup(auth, provider).then((result) => {
      props.setUserName(result.user.displayName);
    });
  };

  const onLogout = () => {
    console.log("Logout");
    signOut(auth).then(() => {
      props.setUserName("");
    });
  };

  if (props.userName) {
    return (
      <>
        <p>Hello {props.userName}</p>
        <button onClick={onLogout}>Logout</button>
      </>
    );
  } else {
    return <button onClick={onGoogleLogin}>Login</button>;
  }
};

export default LoginButton;
