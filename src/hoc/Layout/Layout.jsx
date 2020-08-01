import React, {Component} from "react";
import Header from "../../containers/Header/Header";
import Footer from "../../containers/Footer/Footer";
import Auth from "../../containers/Auth/Auth";
import Join from "../../containers/Join/Join";

class Layout extends Component{
    state = {
        isAuth: false,
        isJoin: false
    };

    onAuthToggle = () => {
        this.setState({isAuth: !this.state.isAuth})
    }

    onJoinToggle = () => {
        this.setState({isJoin: !this.state.isJoin})
    }

    render() {
        return (
            <>
                {
                    this.state.isAuth && <Auth onClick={this.onAuthToggle}/>
                }
                {
                    this.state.isJoin && <Join onClick={this.onJoinToggle}/>
                }
                <Header onAuthClick={this.onAuthToggle} onJoinClick={this.onJoinToggle}/>
                {this.props.children}
                <Footer/>
            </>
        );
    }
}

export default Layout;