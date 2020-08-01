import React from "react";
import logo from './logo.png'
import Button from "../../components/UI/Button/Button";


const Header = props => {
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                    <img src={logo} alt="logo"/>
                </div>
                <ul className="header-list">
                    <Button type='primary' onClick={props.onAuthClick}>Вход</Button>
                    <Button type='primary' onClick={props.onJoinClick}>Регистрация</Button>
                </ul>
            </div>
        </header>
    )
}

export default Header;