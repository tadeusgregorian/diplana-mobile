//@flow

import { createFirebaseListener } from './firebaseHelpers'
import { getFBPath } from '../actionHelpers'
import type { ThunkAction, GetState } from 'types/index'
import { db } from '../firebaseInit'

const getWeekAndBranch = (getState) => ({
  weekID:  getState().ui.roster.currentWeekID,
  branch:  getState().ui.roster.currentBranch
})

export const setInitialRosterListeners: ThunkAction = () => (dispatch, getState) => {
  setRosterListeners()(dispatch, getState)
  setShiftEditsListener(dispatch, getState)
}

export const setRosterListeners: ThunkAction = () => (dispatch, getState: GetState) => {
  dispatch({type: 'remove_shiftWeek'})
  setShiftWeekListener(dispatch, getState)
  setDayNotesListener(dispatch, getState)
}

const setShiftWeekListener = (dispatch, getState: any) => {
  const { weekID, branch } = getWeekAndBranch(getState)
  const path        = getFBPath('shiftWeeks', [weekID])
  const queryRef    = db().ref(path).orderByChild('branch').equalTo(branch)

  createFirebaseListener(dispatch, getState, 'shiftWeek', path, queryRef)
}

const setShiftEditsListener = (dispatch, getState: any) => {
  const path = getFBPath('shiftEdits')
  createFirebaseListener(dispatch, getState, 'shiftEdits', path)
}

const setDayNotesListener = (dispatch: Dispatch, getState: GetState) => {
  const { weekID, branch }  = getWeekAndBranch(getState)
  const path                = getFBPath('dayNotes', [weekID])
  const queryRef            = db().ref(path).orderByChild('branch').equalTo(branch)

  createFirebaseListener(dispatch, getState, 'dayNotes', path, queryRef)
}
