import { getAuth, signInWithRedirect, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firebaseApp } from "../service/firebase";

const Login = (props) => {
    const navigate = useNavigate();    
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    getRedirectResult(auth)
    .then((result) => {
    console.log(result)
    if(result!==null){
        navigate('/');
    }
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

//     signInWithRedirect(auth, provider)
//   .then((result) => {            
//     //   const credential = GoogleAuthProvider.credentialFromResult(result);
//     //   const token = credential.accessToken;    
//   }).catch((error) => {    
//   });
//   return 
  return <div>Login</div>
};

export default Login;