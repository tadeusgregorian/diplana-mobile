//@flow
import { createDataStatusReducer, createFirebaseReducer_array } from '../reducerHelpers'
import { combineReducers } from 'redux'
import type { Notes, ShiftEdits, Shifts, DataStatus, DayNote } from 'types/index'

export type Roster = {
  notes: Notes,
  shiftEdits: ShiftEdits,
  shiftWeek: Shifts,
  dayNotes: Array<DayNote>,
  shiftWeekDataStatus: DataStatus,
}

export default combineReducers({
  notes: createFirebaseReducer_array('notes'),
  shiftEdits: createFirebaseReducer_array('shiftEdits'),
  shiftWeek: createFirebaseReducer_array('shiftWeek'),
  dayNotes: createFirebaseReducer_array('dayNotes'),
  shiftWeekDataStatus: createDataStatusReducer('shiftWeek'),
})
