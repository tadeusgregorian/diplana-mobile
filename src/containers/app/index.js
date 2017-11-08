//@flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import appDataLoaded from 'selectors/appDataLoaded'
import type { Store } from 'types/index'
import './styles.css'


class App extends PureComponent {

  render = () => {
    if(!this.props.appDataLoaded) return (<fb>Loading...</fb>)

    return(
      <fb className="appMain">
        <fb className="appMainContent">
          content here
        </fb>
      </fb>
    )
  }
}

const mapStateToProps = (state: Store) => ({
  appDataLoaded: appDataLoaded(state),
  preferences: state.core.accountDetails.preferences,
})

export default connect(mapStateToProps)(App)
