//@flow
import { getNextWeekID, getPrevWeekID } from 'helpers/roster'
import type { ThunkAction, GetState } from 'types/index'

export const changeCurrentBranch: ThunkAction = (branchID: string) => (dispatch, getState: GetState) => {
  localStorage.setItem('currentBranch', branchID )
  dispatch({ type: 'SET_CURRENT_BRANCH', payload: branchID })
}

export const changeCurrentWeekID = (weekID: string) =>
  ({ type: 'SET_CURRENT_WEEK_ID', payload: weekID })

export const leaveTemplateMode = () =>
  ({ type: 'LEAVE_TEMPLATE_MODE' })

export const goToNextWeek: ThunkAction = () => (dispatch, getState) => {
  const nextSW = getNextWeekID(getState().ui.roster.currentWeekID)
  dispatch({type: 'SET_CURRENT_WEEK_ID', payload: nextSW})
}

export const goToLastWeek: ThunkAction = () => (dispatch, getState) => {
  const prevSW = getPrevWeekID(getState().ui.roster.currentWeekID)
  dispatch({type: 'SET_CURRENT_WEEK_ID', payload: prevSW})
}
