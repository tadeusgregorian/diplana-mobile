import firebase from 'firebase'
import { trackFBListeners } from './firebaseHelpers'
import { createCookie } from './localHelpers';

export const setAuthStateListener = (initializor) => {
  return (dispatch, getState) => {

    trackFBListeners(dispatch, getState, 'firebaseAuth', 'noPath')
    dispatch({type: 'USER_IS_AUTHENTICATING'})

    firebase.auth().onAuthStateChanged((user) => {

      if (!user) return dispatch({type: 'USER_LOGGED_OUT'})

      firebase.database().ref('allUsers/' + user.uid).once('value')
        .then(snap => {
          if(!snap.val()) return firebase.auth().signOut()

          user.getIdToken(false).then(idToken => {
            createCookie('__session', idToken, 10)
          }).catch(e => console.log('gettingTokenFailedTade: ', e))

          dispatch({type: 'USER_LOGGED_IN' })
          dispatch({type: 'SET_ACCOUNT_ID',       payload: snap.val().account})
          dispatch({type: 'SET_CURRENT_USER_ID',  payload: snap.val().userID})

          window.accountID = snap.val().account // this is little hacky.. so helper function can have access to accountID without getState()
          initializor()
        })
    })
  }
}
