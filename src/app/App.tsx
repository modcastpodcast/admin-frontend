import React, {Component} from "react";
import {
    HashRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import './app.scss';

import AllURLPage from "../pages/urls/AllURLPage";
import TokenSavePage from "../pages/urls/TokenSavePage";

import UsersPage from "../pages/admin/UsersPage";
import TokensPage from "../pages/admin/TokensPage";

class App extends Component {
    render() {
        return <div className="App">
            <Router>
                <Sidebar></Sidebar>
                
                <div className="Body">
                    <Switch>
                        <Route path="/" exact={true}>
                            <AllURLPage/>
                        </Route>
                        <Route path="/authorize/:token">
                            <TokenSavePage/>
                        </Route>

                        <Route path="/admin/users">
                            <UsersPage/>
                        </Route>

                        <Route path="/admin/tokens">
                            <TokensPage/>
                        </Route>

                    </Switch>
                </div>
            </Router>
        </div>
    }
}

export default App;