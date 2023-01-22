import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadString } from "firebase/storage";
import { getFirestore, addDoc, collection } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB7IiyqtqTv1WSPG6NqWE7aEoH7PHYC5TE",
    authDomain: "openio-822a3.firebaseapp.com",
    projectId: "openio-822a3",
    storageBucket: "openio-822a3.appspot.com",
    messagingSenderId: "745578469801",
    appId: "1:745578469801:web:37fe9743c75a2b5f7cccb8",
    measurementId: "G-Q9T38071YK"
  };

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const storage = getStorage();
export const restorerStorageRef = ref(storage, 'restorer');
export const db = getFirestore(firebase);

export const uploadRestoredImage = (image: string) => {
    uploadString(restorerStorageRef, image, 'data_url').then((snapshot: any) => {
        console.log('Uploaded a data_url string!');
      });
};
interface saveRestoredProps {
    uuid: string,
    image: string,
    restored: string,
}
export const saveRestored = async (props: saveRestoredProps) => {
    try {
        const docRef = await addDoc(collection(db, "restorer"), props);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }  
};

  
export default firebase;