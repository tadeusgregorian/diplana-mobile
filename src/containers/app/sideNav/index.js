//@flow
import React, { PureComponent } from 'react'
import NavAnimator from './navAnimator'
import './styles.css'

type Props = {

}

export default class SideNav extends PureComponent {
  props: Props

  componentDidMount = () => { new NavAnimator() }

  render(){
    return(
        <aside className="js-side-nav side-nav">
          <nav className="js-side-nav-container side-nav__container">
            <fb className="icon icon-arrow-back closeBtn js-menu-hide"></fb>
            <header className="side-nav__header">
              Optionen
            </header>
            <ul className="side-nav__content">
              <li>logout</li>
            </ul>
          </nav>
        </aside>
    )
  }
}
