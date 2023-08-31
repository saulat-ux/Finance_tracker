import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBLturxoNHeqSuikITEeoom4_xnEIGNK40",
    authDomain: "mymoney-bcaaf.firebaseapp.com",
    projectId: "mymoney-bcaaf",
    storageBucket: "mymoney-bcaaf.appspot.com",
    messagingSenderId: "250020939017",
    appId: "1:250020939017:web:335406ab01398d4874ffd8"
  };

  firebase.initializeApp(firebaseConfig)

  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()

  //timestamp
  const timestamp = firebase.firestore.Timestamp

  export { projectFirestore ,projectAuth ,timestamp }