import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import FirebaseContext, { withFirebase } from './context'

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
      url: window.location.href,
    })

  //User API
  users = () => this.db.ref('users')
  user = uid => this.db.ref(`users/${uid}`)
  //Problems API
  problems = () => this.db.ref('problems')
  problem = pid => this.db.ref(`problems/${pid}`)
}

export default Firebase
export { FirebaseContext, withFirebase }