import { dbStructure } from "./dbManager.js";

const firebaseConfig = {
  apiKey: "AIzaSyC6VYT4VLAsguid-o5qIv7ZQVMRu-BdLNM",
  authDomain: "jackedplanner.firebaseapp.com",
  projectId: "jackedplanner",
  storageBucket: "jackedplanner.appspot.com",
  messagingSenderId: "568897936410",
  appId: "1:568897936410:web:22a686867e103a1137c5a3",
  measurementId: "G-F7GEL0SCTG"
};
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const auth = firebase.auth()

function login(x, y) {
  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
    auth.signInWithEmailAndPassword(x, y).then(() => {
      console.log(`user logged in: ${auth.currentUser}`)
    }).catch(err => console.log(err))
  }).catch(err => console.log(err))
}

function createNewAccount(x, y, z) {
  auth.createUserWithEmailAndPassword(x, y).then(cred => {
    db.collection('users').doc(cred.user.uid).set({
      userEmail: x,
      userName: z
    })
    dbStructure(cred.user.uid)
  }).then(() => {
    console.log('new user created')
  }).catch(err => {
    console.log(err)
  })
}

function logout() {
  auth.signOut().then(() => {
    console.log('User logged Out!')
  }).catch(err => {
    console.error(err)
  })
}

auth.onAuthStateChanged(user => {
  if (user) {
    console.log(user.currentUser)
  } else { console.log('ninguém loggado!') }
})


export { createNewAccount, login, logout }
export { firebaseConfig, db }


/* CRIAR UM CAMINHO PARA ESTRUTURAR O DATA BASE!! */