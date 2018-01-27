import firebase from "firebase";
import "firebase/firestore";
import { FIREBASE_CONFIG } from "../config";

export const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
export const firebaseAuth = firebaseApp.auth();
export const firebaseFirestore = firebase.firestore();
export const firebaseStorage = firebaseApp.storage();

export function creatUser(email, password) {
  return firebaseAuth.createUserWithEmailAndPassword(email, password);
}

export function loginUser(email, password) {
  console.log(email, password);
  return firebaseAuth.signInWithEmailAndPassword(email, password);
}

export function fetchUser() {
  return new Promise((resolve, reject) => {
    const unsub = firebaseAuth.onAuthStateChanged(
      user => {
        unsub();
        resolve(user);
      },
      error => {
        reject(error);
      }
    );
  });
}

export function logoutUser() {
  return firebaseAuth.signOut();
}

export function changePassword(password) {
  return firebaseAuth.currentUser.updatePassword(newPassword);
}

export function resetPasswordEmail(email) {
  return firebaseAuth.sendPasswordResetEmail(email);
}

export function getAll(collection) {
  return firebaseFirestore.collection(collection).get();
}

export function getWthPaginator(collection, start, limit) {
  
}

export function getWhere(collection, operation, field, value){

  return firebaseFirestore.collection(collection).where(field, operation, value).get();
}

export function get(collection, doc) {
  return firebaseFirestore
    .collection(collection)
    .doc(doc)
    .get();
}

export function add(collection, data) {
  return firebaseFirestore.collection(collection).add(data);
}

export function addSubCollection(collection, doc, subCollection, data) {
  return firebaseFirestore
    .collection(collection)
    .doc(doc)
    .collection(subCollection)
    .add(data);
}

export function set(collection, doc, data) {
  firebaseFirestore
    .collection(collection)
    .doc(doc)
    .set(data)
    .then(function(d) {
      console.log(d);
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
}

export function update(collection, doc, data) {
  return firebaseFirestore
    .collection(collection)
    .doc(doc)
    .update(data);
}

export function del(collection, doc) {
  return firebaseFirestore
    .collection(collection)
    .doc(doc)
    .delete();
}

export function getServerTime() {
  return firebase.firestore.FieldValue.serverTimestamp();
}
export function getStorageReference(path) {
  return firebaseStorage.ref(path);
}
