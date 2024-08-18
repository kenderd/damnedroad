
import { initializeApp } from "firebase/app";
import {FirebaseStorage, getStorage} from  "firebase/storage"
import {addDoc, collection, doc, Firestore, getDoc, getDocs, getFirestore, initializeFirestore} from "firebase/firestore"
import { product } from "@/types";



// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkmyNLiVwecNJ0Xm9KBZDFqn1M4JCivA0",
  authDomain: "guildstestfunctionalities.firebaseapp.com",
  projectId: "guildstestfunctionalities",
  storageBucket: "guildstestfunctionalities.appspot.com",
  messagingSenderId: "1026512018387",
  appId: "1:1026512018387:web:b5d125bfde56fc8cbdad26"
};


    const app = initializeApp(firebaseConfig);
    const storage = getStorage();
    const db = getFirestore(app);


  

   export const getProducts = async()=> {
    const collectionRef = collection(db, "products");
    const docSnap = await getDocs(collectionRef);
    const docsMap:product[] = (docSnap.docs.map((doc)=>{return {id:doc.id,...doc.data()}})) as unknown as product[]

    return docsMap;
  }
  




