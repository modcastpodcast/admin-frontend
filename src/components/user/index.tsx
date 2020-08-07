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
        </div>
    }
}

export default UserRow;