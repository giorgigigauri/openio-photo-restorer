import * as firebase from 'firebase-admin';

let serviceAccount = require('../openio-822a3-firebase-adminsdk-ow882-ba3fd1db77.json');
interface saveRestoredProps {
  uuid: string,
  image: string,
  restored: string,
}
if ( !firebase.apps.length ) {
  firebase.initializeApp( {
    credential: firebase.credential.cert(serviceAccount)
  } )
}
 
export const saveRestored = async (props: saveRestoredProps) => {
    try {
      let data = firebase.firestore()
      .collection('restored_photos')
      .doc(props.uuid)
      .set(props)
        console.log("Document written with ID");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
  };

  
export const getRestored = async (slug: string) => {
    let data = null
    try {
      data = await firebase.firestore()
      .collection('restored_photos')
      .doc(slug)
      .get().then(result => result.data());
    } catch (e) {
        console.error("Error getting document: ", e);
    }  
    return data || null;
  };
  