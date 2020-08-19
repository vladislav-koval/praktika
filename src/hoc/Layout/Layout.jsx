import React, { Component } from "react";
import Header from "../../containers/Header/Header";
import Footer from "../../containers/Footer/Footer";
import Auth from "../../containers/Auth/Auth";
import Join from "../../containers/Join/Join";
import { isAuthorized, logout } from "../../services/AuthServise";

class Layout extends Component {
  state = {
    isAuth: false,
    isJoin: false,
    isAuthorized: false,
  };

  componentDidMount() {
    const authorized = isAuthorized();
    this.setState({ isAuthorized: authorized });
  }

  onAuthToggle = () => {
    this.setState({ isAuth: !this.state.isAuth })
  }

  onJoinToggle = () => {
    this.setState({ isJoin: !this.state.isJoin })
  }

  setAuthorizedUser = (authorized) => {
    this.setState({ isAuthorized: authorized });
  }

  onLogout = () => {
    logout();
    window.location = "/"
    this.setAuthorizedUser(false);
  }

  render() {
    return (
      <>
        {
          this.state.isAuth && <Auth onClick={this.onAuthToggle} setAuthorizedUser={this.setAuthorizedUser} />
        }
        {
          this.state.isJoin && <Join onClick={this.onJoinToggle} setAuthorizedUser={this.setAuthorizedUser} />
        }
        <Header onAuthClick={this.onAuthToggle} onJoinClick={this.onJoinToggle} onLogoutClick={this.onLogout}
                isAuthorized={this.state.isAuthorized} />
        {this.props.children}
        <Footer />
      </>
    );
  }
}

export default Layout;