import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import React from 'react'
import FirebaseContext, { withFirebase } from './context'
const firebaseConfigTest = {
  apiKey: "AIzaSyBiMV_Yx_49efojZW6okr5UuYWZTnS--Uk",
  authDomain: "nitr-codes.firebaseapp.com",
  databaseURL: "https://nitr-codes.firebaseio.com",
  projectId: "nitr-codes",
  storageBucket: "nitr-codes.appspot.com",
  messagingSenderId: "618458581799",
  appId: "1:618458581799:web:e154f9cbfcb5f57c09f702",
  measurementId: "G-PDBMP0JF4Z"
};

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

class Firebase{
  constructor() {
    app.initializeApp(firebaseConfig)
    this.auth = app.auth()
    this.db = app.database()
  }
  //Authorization
  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password)
  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password)
  doSignOut = () => this.auth.signOut()
  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  //User API
  users = () => this.db.ref('users')
  user = uid => this.db.ref(`users/${uid}`)
}

export default Firebase
export { FirebaseContext, withFirebase }