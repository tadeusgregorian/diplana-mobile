import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import { initFirebase } from 'actions'
import { setAuthStateListener, registerInitialListeners } from 'actions/listeners'

import Login    from './login'
import App      from './app'

class Container extends PureComponent {
  componentDidMount = () => {
    if(!this.props.firebaseInitialized) this.props.initFirebase() // making sure we initialize Firebase only once...
    if(!this.props.firebaseAuthListener){
      // giving registerInitialListeners as a callback cause i want it to be called on every login by firebase
      // by chaining it with a .then this will only called the first time after login ( not the next time after logging in and out) yes i was dead by this bug. dead
      this.props.setAuthStateListener(this.props.registerInitialListeners)
    }
  }

  render() {
    const { authState }     = this.props
    const loggedIn 					=  authState === 'loggedIn'
    const isAuthenticating 	=  authState === 'isAuthenticating'

    if(isAuthenticating) return (<fb>authenticating...</fb>)

    return (
      <Router>
        <fb className="Container_Main">
          <fb className='Container_Main_Inside'>
            <Route path='/'   exact render={() => loggedIn ? <Redirect to="/app/" /> : <Redirect to="/login" /> } />
            <Route path='/login'    render={() => loggedIn ? <Redirect to="/app/" /> : <Login /> } />
            <Route path='/app'      render={() => loggedIn ? <App /> : <Redirect to="/login" /> } />
          </fb>
        </fb>
      </Router>
    )
  }
}

const mapDispatchToProps = {
  initFirebase,
  setAuthStateListener,
  registerInitialListeners
}

const mapStateToProps = (state) => ({
  firebaseInitialized: state.firebaseInitialized,
	firebaseAuthListener: state.firebaseListeners.firebaseAuth,
  authState: state.auth.authState,
  modals: state.ui.modals
})

export default connect(mapStateToProps, mapDispatchToProps)(Container)
