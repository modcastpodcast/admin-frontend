import React, { Component, Suspense } from "react";
import { NavLink } from "react-router-dom";

import logo from "./icon.png";

import "./sidebar.scss";

import CurrentUser from "../current_user";
import { getCurrentUser, getUser } from "../../api";
import { wrapPromise } from "../../utils";

interface SidebarState {
    adminSection: JSX.Element | null,
}

interface SidebarProps {
    toggleTheme: () => void
}

class Sidebar extends Component<SidebarProps, SidebarState> {
    constructor(props: SidebarProps) {
        super(props);

        this.state = {
            adminSection: null
        }
    }

    async componentDidMount(): Promise<void> {
        const currentUser = await getCurrentUser();

        if (currentUser.is_admin) {
            this.setState({
                adminSection: <div>
                    <li className="nav-section">
                        Admin
                    </li>
                    <li>
                        <NavLink activeClassName="active-link" exact={true} to="/admin/users">Users</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active-link" exact={true} to="/admin/tokens">Tokens</NavLink>
                    </li>
                </div>
            })
        }
    }

    render(): JSX.Element {
        const dataRequest = wrapPromise((async () => {
            const currentKey = await getCurrentUser();
            const currentUser = await getUser(currentKey.creator);
        
            return currentUser;
        })())
    
        return <div className="Sidebar-holder">
            <div className="Sidebar">
                <div className="Sidebar-top">
                    <div className="header">
                        <img alt="modcast logo" src={logo} width={120} className="Sidebar-icon"></img>
                        <h1 className="Sidebar-title">ModPod Admin</h1>
                    </div>
                    <nav className="Sidebar-nav">
                        <div>
                            <li className="nav-section">
                                URL management
                            </li>
                            <li>
                                <NavLink activeClassName="active-link" exact={true} to="/">All URLs</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName="active-link" to="/mine">My URLs</NavLink>
                            </li>
                        </div>
                        <div>
                            <li className="nav-section">
                                Calendar
                            </li>
                            <li>
                                <NavLink activeClassName="active-link" exact={true} to="/calendar">Social Calendar</NavLink>
                            </li>
                        </div>
                        {this.state.adminSection}
                    </nav>
                </div>
                <div className="Sidebar-bottom">
                    <button onClick={this.props.toggleTheme} className="button primary theme-button">Toggle theme</button>
                    <Suspense fallback={""}>
                        <CurrentUser userResource={dataRequest} />
                    </Suspense>
                </div>
            </div>
        </div>
    }
}

export default Sidebar;
