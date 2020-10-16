import React, {Component} from 'react'
import classes from './Drawer.css'
import Backdrop from "../Backdrop/Backdrop";
import {NavLink} from 'react-router-dom'
import {ACCOUNT, LOG, MAIN, AUTH} from "../../../Route/path";

const links = [
  {
    to: MAIN,
    title: 'Главная',
    exact: true
  },
  {
    to: ACCOUNT,
    title: 'Личный кабинет',
    exact: false
  },
  {
    to: LOG,
    title: 'Вход',
    exact: false
  },
  {
    to: AUTH,
    title: 'Зарегистрироваться',
    exact: false
  },
];

class Drawer extends Component {

  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink exact={link.exact} to={link.to}>
            {link.title}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    const cls = [classes.Drawer];

    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul onClick={this.props.onClose}>
            { this.renderLinks() }
          </ul>
        </nav>
        { this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null }
      </React.Fragment>
    )
  }
}

export default Drawer
