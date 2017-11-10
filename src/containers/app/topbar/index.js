//@flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import type { Connector } from 'react-redux'
import { setPlanMode, changeCurrentWeekID } from 'actions/ui/roster'
import { openSideNav } from 'actions/ui/index'
import DateSelect from './dateSelect'
import Navigation from './navigation'

import type { Store, PlanMode, SideNav, Branch } from 'types/index'
import './styles.css'

type Props = {
  planMode: PlanMode,
  branches: Array<Branch>,
  currentBranch: string,
  currentWeekID: string,
  setPlanMode: (PlanMode)=>any,
  changeCurrentWeekID: (string)=>any,
  openSideNav: (SideNav)=>any,
}

class Topbar extends PureComponent {

  render(){
    const { planMode, setPlanMode, openSideNav, branches, currentBranch, currentWeekID, changeCurrentWeekID } = this.props
    const curBranch: Branch = (branches.find(b => b.id === currentBranch) :any)
    const branchName = curBranch.name
    const openBranchPick = () => openSideNav('BRANCH_PICK')
    const openOptionsBar = () => openSideNav('OPTIONS')

    return(
      <fb id="topbarMain">
        <Navigation {...{ planMode, setPlanMode, openBranchPick, openOptionsBar, branchName }} />
        <DateSelect {...{ planMode, currentWeekID, changeCurrentWeekID}} />
      </fb>
    )
  }
}

const actionCreators = {
  setPlanMode,
  openSideNav,
  changeCurrentWeekID,
}

const mapStateToProps = (state: Store) => ({
  planMode: state.ui.roster.planMode,
  branches: state.core.branches,
  currentBranch: state.ui.roster.currentBranch,
  currentWeekID: state.ui.roster.currentWeekID,
})

const connector: Connector<{}, Props> = connect(mapStateToProps, actionCreators)
export default connector(Topbar)
