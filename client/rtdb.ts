import firebase from "firebase";

const app = firebase.initializeApp({
  apiKey: "DrxRd2dfGEYIfT850XWlETfkw8w0UmbxVsPSUbUp",
  databaseURL: "https://dwf-m6-desafio-final-default-rtdb.firebaseio.com",
  authDomain: "dwf-m6-desafio-final.firebaseapp.com",
});
const rtdb = firebase.database();
export { rtdb };
