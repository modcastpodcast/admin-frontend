import React, {Component, Suspense} from "react";
import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import './app.scss';
import * as Sentry from '@sentry/react';

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

import MyURLPage from "../pages/urls/MyURLPage";
import AllURLPage from "../pages/urls/AllURLPage";

import EventsPage from "../pages/calendar/EventsPage";

const UsersPage = React.lazy(() => import("../pages/admin/UsersPage"));
const TokensPage = React.lazy(() => import("../pages/admin/TokensPage"));

function FallbackComponent() {
    return (
        <div>An error has occurred</div>
    )
}

interface AppState {
    theme: string
}

class App extends Component<Readonly<Record<string, unknown>>, AppState> {
    constructor(props: Readonly<Record<string, unknown>>) {
        super(props);

        this.state = {
            theme: localStorage.theme ? localStorage.theme : "dark"
        }

        this.toggleTheme = this.toggleTheme.bind(this);
    }

    toggleTheme(): void {
        const newTheme = this.state.theme === "dark" ? "light" : "dark";
        this.setState({
            theme: newTheme
        })

        localStorage.theme = newTheme;
    }

    render(): JSX.Element {
        document.body.setAttribute("class", `theme-${this.state.theme}`);

        if (document.location.hash.indexOf("/authorize/") !== -1) {
            console.debug("Detected token in URL. Saving to localStorage")
            localStorage.token = document.location.hash.split("/")[2];
        }

        return <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog>
            <div className={`App`}>
                <ToastContainer/>
                <Router>
                    <Sidebar toggleTheme={this.toggleTheme}></Sidebar>
                    
                    <div className="Body">
                        <Switch>
                            <Route path="/" exact={true}>
                                <AllURLPage/>
                            </Route>
                            <Route path="/mine">
                                <MyURLPage/>
                            </Route>

                            <Route path="/calendar">
                                <EventsPage/>
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
                                <Redirect to="/"></Redirect>
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        </Sentry.ErrorBoundary>
    }
}

export default App;
