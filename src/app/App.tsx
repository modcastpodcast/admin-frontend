import React, {Component} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Sidebar from "../sidebar/Sidebar";
import './app.scss';

import AllURLPage from "../pages/urls/AllURLPage";

class App extends Component {
    render() {
        return <div className="App">
            <Router>
                <Sidebar></Sidebar>
                
                <div className="Body">
                    <Switch>
                        <Route path="/" exact={true}>
                            <AllURLPage></AllURLPage>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    }
}

export default App;