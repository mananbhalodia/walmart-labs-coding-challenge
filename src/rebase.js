// Initialize firebase with rebase library

import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


var app = firebase.initializeApp({
  apiKey: 'AIzaSyCKrrRPPY4GToRn8mhv7BQPmNwXj285c9g',
  authDomain: 'task-master-822ee.firebaseapp.com',
  databaseURL: 'https://task-master-822ee.firebaseio.com',
  storageBucket: "task-master-822ee.appspot.com",
  messagingSenderId: "980692881731"
});
var base = Rebase.createClass(app.database());

export { base, app };