//@flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import type { Connector } from 'react-redux'
//import { fixPos } from './localHelpers'
//import BranchSelect from './branchSelect'
import type { Store, PlanMode } from 'types/index'
import { setPlanMode } from 'actions/ui/roster'
import DateSelect from './dateSelect'
import Navigation from './navigation'
import './styles.css'

type Props = {
  planMode: PlanMode,
  setPlanMode: (PlanMode)=>any,
}

class Topbar extends PureComponent {

  render(){
    const { planMode, setPlanMode } = this.props

    return(
      <fb id="topbarMain">
        <Navigation {...{ planMode, setPlanMode }} />
        {/* <BranchSelect /> */}
        <DateSelect />
      </fb>
    )
  }
}

const actionCreators = {
  setPlanMode
}

const mapStateToProps = (state: Store) => ({
  planMode: state.ui.roster.planMode,
})

const connector: Connector<{}, Props> = connect(mapStateToProps, actionCreators)
export default connector(Topbar)
