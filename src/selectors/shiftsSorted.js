//@flow
import { createSelector } from 'reselect'
import type { User, Shift, Store } from 'types/index'
import sortBy from 'lodash/sortBy'

const getShfits      = (state: Store) => state.roster.shiftWeek
const getUsers 	     = (state: Store) => state.core.users

const getShiftsSorted = (shifts: Array<Shift>, users: Array<User>): Array<Shift> => {
  const shiftsExt = shifts.map(s => ({ ...s, prio: s.user === 'open' ? 0 : 1  }))
  const sortedShifts = sortBy(shiftsExt, ['prio', 's'])
  return sortedShifts
}

export default createSelector([getShfits, getUsers], getShiftsSorted)
