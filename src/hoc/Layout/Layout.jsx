import React, {Component} from "react";
import Header from "../../containers/Header/Header";
import Footer from "../../containers/Footer/Footer";
import Auth from "../../containers/Auth/Auth";

class Layout extends Component{
    state = {
        isAuth: true,
    };

    onAuthToggle = () => {
        this.setState({isAuth: !this.state.isAuth})
    }

    render() {
        return (
            <>
                {
                    this.state.isAuth && <Auth onClick={this.onAuthToggle}/>
                }
                <Header/>
                {this.props.children}
                <Footer/>
            </>
        );
    }
}

export default Layout;