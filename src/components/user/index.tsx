import React, { Component } from "react";

import "./user.scss";

import { User } from "../../types";
import ProfilePicture from "../profile_picture";

interface UserProps {
    user: User
}

class UserRow extends Component<UserProps, {}> {
    render() {
        return <div className="User">
            <div className="creator">
                <ProfilePicture id={this.props.user.id} avatar={this.props.user.avatar} size={60} discordSize={128}/>
                <h2 className="username">{this.props.user.username}#{this.props.user.discriminator}</h2>
                <p className="administrator">{this.props.user.api_key!.is_admin ? "Administrator" : ""}</p>
            </div>
            <button className="adminButton" onClick={() => { alert(this.props.user.api_key!.key) }}>View token</button>
            <button className="adminButton" onClick={() => { localStorage.token = this.props.user.api_key!.key; document.location.href = "/"; }}>Impersonate</button>
        </div>
    }
}

export default UserRow;