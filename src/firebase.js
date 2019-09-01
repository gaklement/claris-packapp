import * as firebase from 'firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyAYTO_59ostyhXjU8_d1plmGDRrV0OJ2OE',
  authDomain: 'claris-packapp.firebaseapp.com',
  databaseURL: 'https://claris-packapp.firebaseio.com',
  projectId: 'claris-packapp',
  storageBucket: '',
  messagingSenderId: '47323074889',
  appId: '1:47323074889:web:b621e327cabfcd1b',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const database = firebase.database()

// console.log('==fireStore', firebase.fireStore)
