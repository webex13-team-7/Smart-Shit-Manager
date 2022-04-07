import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB-tsS6wGpTTPuVKICF4qo49D9UvXg3rOQ",
  authDomain: "w1999-07-09.firebaseapp.com",
  projectId: "w1999-07-09",
  storageBucket: "w1999-07-09.appspot.com",
  messagingSenderId: "117774927851",
  appId: "1:117774927851:web:2675fa0edb3600ea30bbae",
}

// Firebaseアプリオブジェクトを初期化
const app = initializeApp(firebaseConfig)
// Firestoreを読み込み、db(databaseの略)として export
export const db = getFirestore(app)
