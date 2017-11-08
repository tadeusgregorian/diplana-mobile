//@flow
import { combineReducers } from 'redux'
import roster from './roster'
import type { Roster } from './roster'


export type Ui = {
  roster: Roster,
}

export default combineReducers({
  roster,
})
