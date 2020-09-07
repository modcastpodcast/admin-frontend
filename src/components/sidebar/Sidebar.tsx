import React, { Component, Suspense } from "react";
import { NavLink } from "react-router-dom";

import logo from "./icon.png";

import "./sidebar.scss";

import CurrentUser from "../current_user";
import { getCurrentUser } from "../../api";

interface SidebarState {
    adminSection: JSX.Element | null,
}

class Sidebar extends Component<Readonly<{}>, SidebarState> {
    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            adminSection: null
        }
    }

    async componentDidMount() {
        let currentUser = await getCurrentUser();

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
    render() {
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
                                <NavLink activeClassName="active-link" exact={true} to="/calendar">Calendar</NavLink>
                            </li>
                        </div>
                        {this.state.adminSection}
                    </nav>
                </div>
                <div className="Sidebar-bottom">
                    <Suspense fallback={""}>
                        <CurrentUser />
                    </Suspense>
                </div>
            </div>
        </div>
    }
}

export default Sidebar;
