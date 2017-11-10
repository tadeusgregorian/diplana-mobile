//@flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import type { Connector } from 'react-redux'
import getShiftsSorted from 'selectors/shiftsSorted'
import { setShiftWeekListener } from 'actions/listeners/roster'
import TeamShiftList from './teamShiftList'
import PersonalShiftList from './personalShiftList'
import type { Store, PlanMode, Shift, DataStatus } from 'types/index'
import './styles.css'

type Props = {
  planMode: PlanMode,
  currentDay: string,
  currentBranch: string,
  currentWeekID: string,
  shiftWeek: Array<Shift>,
  shiftWeekDataStatus: DataStatus,
  setShiftWeekListener: Function,
}

class ShiftBoard extends PureComponent {

  componentDidMount = () => this.props.setShiftWeekListener()
  componentWillReceiveProps = (np: Props) => {
    const {
      currentBranch,
      currentWeekID,
      planMode,
      currentDay,
      setShiftWeekListener } = this.props

    const branchChanged   = np.currentBranch    !== currentBranch
    const swChanged       = np.currentWeekID    !== currentWeekID
    const modeChanged     = np.planMode         !== planMode
    const dayChanged      = np.currentDay       !== currentDay

    if(branchChanged || swChanged || modeChanged || dayChanged) setShiftWeekListener()
  }


  render(){
    const { shiftWeekDataStatus, planMode, shiftWeek, currentWeekID } = this.props
    const shifts = shiftWeek
    const inTeamMode = planMode === 'TEAM'
    const loading = shiftWeekDataStatus !== 'LOADED'

    return(
      <fb className='shiftBoardMain' >
      { loading
          ? <fb>loading...</fb>
          : inTeamMode
            ? <TeamShiftList {...{ shifts }} />
            : <PersonalShiftList {...{ shifts }} weekID={currentWeekID} />
      }
      </fb>
    )
  }
}

const actionCreators = {
  setShiftWeekListener
}

const mapStateToProps = (state: Store) => ({
  planMode: state.ui.roster.planMode,
  currentDay: state.ui.roster.currentDay,
  currentBranch: state.ui.roster.currentBranch,
  currentWeekID: state.ui.roster.currentWeekID,
  shiftWeek: getShiftsSorted(state),
  shiftWeekDataStatus: state.roster.shiftWeekDataStatus,
})

const connector: Connector<{}, Props> = connect(mapStateToProps, actionCreators)
export default connector(ShiftBoard)
