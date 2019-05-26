import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  };

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
  }

  getUser = () => this.auth.currentUser.uid;

  doSignInwithGoogle = () =>  this.auth.signInWithPopup(this.googleProvider);

  doSignInwithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) => 
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithCredentials =(creds)=> this.auth.signInAndRetrieveDataWithCredential(creds);

  doSignOut = () => this.auth.signOut();

  listenUpdates = (uid) => this.db.collection("users").doc(uid)
  
  forgotPassword = (email) => this.auth.sendPasswordResetEmail(email);

  users = (uid) => this.db.doc(`users/${uid}`);

  user = uid => this.db.doc(`users/${uid}`)

  setAddress = uid => this.db.collection(`users`).doc(`${uid}`);

  passwordUpdate = ( password ) => this.auth.currentUser.updatePassword(password);

  addOrder = ()=> this.db.collection("orders").doc();

  updateEmail = (email) => this.auth.currentUser.updateEmail(email);

  getCalendarId = (uid) => this.db.collection("users").doc(`${uid}`).get();

  setCalendarId = (uid) => this.db.collection("users").doc(`${uid}`);

  getFriends = (uid)=> this.db.collection('users').doc(uid);

  addFriend = (uid) => this.db.collection("users").doc(uid);
}

export default Firebase;