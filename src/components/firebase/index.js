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
  //Contests API
  contests = () => this.db.ref('contests')
  contest = cid => this.db.ref(`contests/${cid}`)
  //Problems API
  problems = () => this.db.ref('problems')
  problem = pid => this.db.ref(`problems/${pid}`)
  //Articles API
  articles = () => this.db.ref('articles')
  article = aid => this.db.ref(`articles/${aid}`)
  //Editorials API
  editorials = () => this.db.ref('editorials')
  editorial = eid => this.db.ref(`editorials/${eid}`)
}

export default Firebase
export { FirebaseContext, withFirebase }