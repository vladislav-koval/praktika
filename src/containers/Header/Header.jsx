import React from "react";
import logo from './logo.png'
import Cookies from "js-cookie";
import Button from "../../components/UI/Button/Button";
import { Link } from "react-router-dom";
import { ADMIN, ROLE, USER } from "../../services/ApiConstants";

const Header = props => {
  let linkToAccount = "/";
  const role = Cookies.get(ROLE);
  if (role === ADMIN) {
    linkToAccount = "/admin/users";
  } else if (role === USER) {
    linkToAccount = "/account";
  }
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <ul className="header-list">
          {props.isAuthorized ?
            (
              <>
                <Link to={linkToAccount}><Button type='primary'>Аккаунт</Button></Link>
                <Button type='logout' onClick={props.onLogoutClick}>Выход</Button>
              </>

            ) :
            (
              <>
                <Button type='primary' onClick={props.onAuthClick}>Вход</Button>
                <Button type='primary' onClick={props.onJoinClick}>Регистрация</Button>
              </>
            )
          }

        </ul>
      </div>
    </header>
  )
}

export default Header;