import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyA_uHnCwpZ5sk9RToP4wdD7-T3XmHfkQeg",
    authDomain: "crwn-db-6e1f7.firebaseapp.com",
    databaseURL: "https://crwn-db-6e1f7.firebaseio.com",
    projectId: "crwn-db-6e1f7",
    storageBucket: "crwn-db-6e1f7.appspot.com",
    messagingSenderId: "744111331918",
    appId: "1:744111331918:web:28c7e6acc873f8a85a411f",
    measurementId: "G-L3NH0GCW0E"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${ userAuth.uid }`);

    const snapShot = await userRef.get();

    console.log(snapShot);
    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log('User Error: ', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);
// firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt : 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
