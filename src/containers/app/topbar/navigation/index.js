//@flow
import React from 'react'
import PlanModeSelector from './planModeSelector'
import type { PlanMode } from 'types/index'
import './styles.css'

type Props = {
  planMode: PlanMode,
  setPlanMode: (PlanMode)=>any,
}

export default (props: Props) => {
  const { planMode, setPlanMode } = props

  return(
    <fb className="navigationMain">
      {/*  the className js-menu-show is neccessary: gets picked up by navAnimator */}
      <fb className='js-menu-show openSideNavBtn icon icon-th-menu'></fb>
      <PlanModeSelector  {...{ planMode, setPlanMode }} />
      <fb className='branch'>Stresemann-Apotheke</fb>
    </fb>
  )
}
