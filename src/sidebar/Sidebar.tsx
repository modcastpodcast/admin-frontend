import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import logo from "./icon.png";

import "./sidebar.scss";

import CurrentUser from "../components/current_user";

class Sidebar extends Component {
    render() {
        return <div className="Sidebar-holder">
            <div className="Sidebar">
                <div className="Sidebar-top">
                    <div className="header">
                        <img src={logo} width={120} className="Sidebar-icon"></img>
                        <h1 className="Sidebar-title">ModPod URLs</h1>
                    </div>
                    <nav className="Sidebar-nav">
                        <li className="nav-section">
                            URL management
                        </li>
                        <li>
                            <NavLink activeClassName="active-link" exact={true} to="/">All URLs</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active-link" to="/abc">My URLs</NavLink>
                        </li>
                        <li className="nav-section">
                            Admin
                        </li>
                        <li>
                            <NavLink activeClassName="active-link" exact={true} to="/admin/users">Users</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active-link" exact={true} to="/admin/tokens">Tokens</NavLink>
                        </li>
                    </nav>
                </div>
                <div className="Sidebar-bottom">
                    <CurrentUser />
                </div>
            </div>
        </div>
    }
}

export default Sidebar;