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
                    <Button type='primary' onClick={props.onClick}>Вход</Button>
                </ul>
            </div>
        </header>
    )
}

export default Header;