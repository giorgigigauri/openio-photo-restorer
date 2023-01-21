import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadString } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDplZjuqg1ZpuxGvHiAJwOTQu79ruQcaGk",
  authDomain: "openio-783fd.firebaseapp.com",
  projectId: "openio-783fd",
  storageBucket: "openio-783fd.appspot.com",
  messagingSenderId: "44675591845",
  appId: "1:44675591845:web:e66bc7d569fc0f182da74c",
  measurementId: "G-1WCW29TCWV"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const storage = getStorage();
export const restorerStorageRef = ref(storage, 'restorer');

export const uploadRestoredImage = (image: string) => {
    uploadString(restorerStorageRef, image, 'data_url').then((snapshot: any) => {
        console.log('Uploaded a data_url string!');
      });
};

  
export default firebase;