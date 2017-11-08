import firebase from 'firebase'

export function signInWithEmailAndPassword (email, pw) {
	return firebase.auth().signInWithEmailAndPassword(email, pw)
}

export function logoutFromFirebase () {
  firebase.auth().signOut()
}

export function sendPasswordResetEmail (email) {
  firebase.auth().sendPasswordResetEmail(email)
}
