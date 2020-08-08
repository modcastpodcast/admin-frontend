import React, {Component, Suspense} from "react";
import {
    HashRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import './app.scss';
import TokenSavePage from "../pages/urls/TokenSavePage";
import * as Sentry from '@sentry/react';

const UsersPage = React.lazy(() => import("../pages/admin/UsersPage"));
const TokensPage = React.lazy(() => import("../pages/admin/TokensPage"));

const MyURLPage = React.lazy(() => import("../pages/urls/MyURLPage"));
const AllURLPage = React.lazy(() => import("../pages/urls/AllURLPage"));

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