import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Home from "./containers/Home/Home";
import Layout from "./hoc/Layout/Layout";
import PersonalArea from "./containers/PersonalArea/PersonalArea";
import { PrivateRoute } from "./hoc/PrivateRoute/PrivateRoute";
import TimeLineGantt from "./containers/TimeLineGantt/TimeLineGantt";

function App() {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <PrivateRoute exact path="/account" component={PersonalArea}/>
                    <Route path="/account/gantt" component={TimeLineGantt}/>
                </Switch>
            </Layout>
        </Router>
    );
}

export default App;
