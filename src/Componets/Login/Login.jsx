import React, { useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, TwitterAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from '../../Firebase/firebase.init';

export default function Login() {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const Googleprovider = new GoogleAuthProvider();
  const Gihubprovider = new GithubAuthProvider()
  const twitterProvider = new TwitterAuthProvider()
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, Googleprovider)
      .then((result) => {
        const loginUser = result.user;
        console.log(loginUser);
        setUser(loginUser);
      })
      .catch((error) => {
        console.log('Error', error.message);
      });
  };

  const handleGithubSignIn = () =>{
    signInWithPopup(auth, Gihubprovider)
    .then((result) => {
        const GihubUser = result.user;
        console.log(GihubUser);
        setUser(GihubUser);
      })
      .catch((error) => {
        console.log('Error', error.message);
      });
  }

  const handleTwitterSignIn =  () =>{
    signInWithPopup(auth, twitterProvider)
    .then((result) => {
        const twitterUser = result.user;
        console.log(twitterUser);
        setUser(twitterUser);
      })
      .catch((error) => {
        console.log('Error', error.message);
      });
  }

  const handleSignOut = () =>{
    signOut(auth)
    .then(result => {
        setUser(null)
    })
    .catch(error =>{
        console.log(error);
    })
  }
  return (
    <div>
        {
            user ? <button onClick={handleSignOut}>Singout</button>:<div><button onClick={handleGoogleSignIn}>Google Login</button><button onClick={handleGithubSignIn}>Github Login</button><button onClick={handleTwitterSignIn}>Twitter Login</button></div>
            
        }
      
      {user && (
        <div>
          <h3>Name: {user.displayName}</h3>
          <p>Email: {user.email}</p>
           <img src={user.photoURL} alt="User Profile" />
        </div>
      )}
    </div>
  );
}
