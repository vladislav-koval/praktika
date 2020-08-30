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
import UserList from "./containers/UserList/UserList";
import AdminUserArea from "./containers/AdminUserArea/AdminUserArea";
import UserProposal from "./containers/UserProposal/UserProposal";

function App() {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <PrivateRoute exact path="/account" component={PersonalArea}/>
                    <Route path="/account/gantt" component={TimeLineGantt}/>
                    <Route path="/account/proposal" component={UserProposal}/>
                    <Route exact path="/admin/users" component={UserList}/>
                    <Route exact path="/admin/users/:name" component={AdminUserArea}/>
                </Switch>
            </Layout>
        </Router>
    );
}

export default App;
