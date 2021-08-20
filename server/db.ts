import * as admin from "firebase-admin";
var serviceAccount = require("./key.json");
// import * as serviceAccount from "./key.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: "https://dwf-m6-desafio-final-default-rtdb.firebaseio.com",
});
const firestore = admin.firestore();
const rtdb = admin.database();

export { firestore, rtdb };
