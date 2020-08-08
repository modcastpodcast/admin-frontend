import React, {Component, Suspense} from "react";
import {
    HashRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import './app.scss';

const UsersPage = React.lazy(() => import("../pages/admin/UsersPage"));
const TokensPage = React.lazy(() => import("../pages/admin/TokensPage"));

const MyURLPage = React.lazy(() => import("../pages/urls/MyURLPage"));
const AllURLPage = React.lazy(() => import("../pages/urls/AllURLPage"));
const TokenSavePage = React.lazy(() => import("../pages/urls/TokenSavePage"));

class App extends Component {
    render() {
        return <div className="App">
            <Router>
                <Sidebar></Sidebar>
                
                <div className="Body">
                    <Switch>
                        <Route path="/" exact={true}>
                            <Suspense fallback={<h1>Loading</h1>}>
                                <AllURLPage/>
                            </Suspense>
                        </Route>
                        <Route path="/mine">
                            <Suspense fallback={<h1>Loading</h1>}>
                                <MyURLPage/>
                            </Suspense>
                        </Route>

                        <Route path="/admin/users">
                            <Suspense fallback={<h1>Loading</h1>}>
                                <UsersPage/>
                            </Suspense>
                        </Route>
                        <Route path="/admin/tokens">
                            <Suspense fallback={<h1>Loading</h1>}>
                                <TokensPage/>
                            </Suspense>
                        </Route>

                        <Route path="/authorize/:token">
                            <Suspense fallback={<h1>Loading</h1>}>
                                <TokenSavePage/>
                            </Suspense>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    }
}

export default App;