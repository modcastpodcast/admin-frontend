import React, {Component, Suspense} from "react";
import {
    HashRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import './app.scss';
import * as Sentry from '@sentry/react';

import MyURLPage from "../pages/urls/MyURLPage";
import AllURLPage from "../pages/urls/AllURLPage";
import TokenSavePage from "../pages/urls/TokenSavePage";

const UsersPage = React.lazy(() => import("../pages/admin/UsersPage"));
const TokensPage = React.lazy(() => import("../pages/admin/TokensPage"));

function FallbackComponent() {
    return (
        <div>An error has occurred</div>
    )
}

class App extends Component {
    render() {
        return <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog>
            <div className="App">
                <Router>
                    <Sidebar></Sidebar>
                    
                    <div className="Body">
                        <Switch>
                            <Route path="/" exact={true}>
                                <AllURLPage/>
                            </Route>
                            <Route path="/mine">
                                <MyURLPage/>
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
                                <TokenSavePage/>
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        </Sentry.ErrorBoundary>
    }
}

export default App;