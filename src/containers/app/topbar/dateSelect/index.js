//@flow
import React from 'react'
import type { PlanMode } from 'types/index'
import WeekSelect from './weekSelect'
import './styles.css'

type Props = {
  planMode: PlanMode,
  changeCurrentWeekID: (string)=>any,
  currentWeekID: string,
}

export default (props: Props) => {
  const { planMode, currentWeekID, changeCurrentWeekID } = props
  const teamMode = planMode === 'TEAM'
  const persMode = planMode === 'PERSONAL'



  return(
    <fb className="dateSelectMain">
      { persMode && <WeekSelect {...{ currentWeekID, changeCurrentWeekID }} /> }
    </fb>
  )
}
