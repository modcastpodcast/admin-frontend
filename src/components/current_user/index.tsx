import React, { Component } from "react";

import "./current_user.scss";

import { getCurrentUser, getUser, redirectToAuthorize } from "../../api";
import ProfilePicture from "../profile_picture";
import { User } from "../../types";

interface CurrentUserState {
    user: User
}

class CurrentUser extends Component<Readonly<{}>, CurrentUserState> {
    constructor(props: Readonly<{}>) {
        super(props);
    
        this.state = {
            user: {
                id: "0",
                username: "Loading",
                discriminator: "0000",
                avatar: "",
                public_flags: 0
            }
        }
    } 
    componentDidMount() {
        let currentUser = getCurrentUser().then(keyData => {
            getUser(keyData.creator).then(userData => {
                this.setState({
                    user: userData
                })
            }).catch(() => {
                redirectToAuthorize();
            })
        }).catch(() => {
            redirectToAuthorize();
        })
    }

    render() {
        if (CurrentUser)
        return <div className="CurrentUser">
            <ProfilePicture id={this.state.user.id} avatar={this.state.user.avatar} size={60} discordSize={128}/>
            <p className="username">Logged in as {this.state.user.username}#{this.state.user.discriminator}</p>
        </div>
    }
}

export default CurrentUser;