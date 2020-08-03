import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Home from "./containers/Home/Home";
import Layout from "./hoc/Layout/Layout";
import PersonalArea from "./containers/PersonalArea/PersonalArea";

function App() {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/account" component={PersonalArea}/>
                </Switch>
            </Layout>
        </Router>
    );
}

export default App;
