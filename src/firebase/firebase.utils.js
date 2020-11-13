import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

  const config = {
    apiKey: "AIzaSyCuqE2QIUyoaDJ-215LGCVb41LVjpiYkD0",
    authDomain: "crown-db-27d41.firebaseapp.com",
    databaseURL: "https://crown-db-27d41.firebaseio.com",
    projectId: "crown-db-27d41",
    storageBucket: "crown-db-27d41.appspot.com",
    messagingSenderId: "942834304176",
    appId: "1:942834304176:web:b5fa83ace522426365e775"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return; 
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch(error) {
        console.log('error creating user', error.message);
      }
      
    }
    return userRef;
  };


  firebase.initializeApp(config);

  export const auth = firebase.auth();

  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;