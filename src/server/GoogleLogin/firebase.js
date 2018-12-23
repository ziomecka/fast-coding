const firebase = require("firebase");

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
const config = {
  apiKey: "AIzaSyAmUQOkpmv5FoCYp5dDefaJkwqYC-bB2HE",
  authDomain: "fastcoding.firebaseapp.com",
  databaseURL: "https://fastcoding.firebaseio.com",
  storageBucket: "<BUCKET>.appspot.com",
};
firebase.initializeApp(config);

module.exports = firebase;