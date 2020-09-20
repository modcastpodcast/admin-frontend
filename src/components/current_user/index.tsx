import React, { Component } from "react";

import "./current_user.scss";

import ProfilePicture from "../profile_picture";
import { WrappedPromise } from "../../utils";
import { User } from "../../types";

interface CurrentUserProps {
    userResource: WrappedPromise<User>
}

class CurrentUser extends Component<CurrentUserProps, Record<string, unknown>> {
    render(): JSX.Element {
        return <div className="CurrentUser">
            <ProfilePicture id={this.props.userResource.read().id} avatar={this.props.userResource.read().avatar} size={60} discordSize={128}/>
            <p className="username">Logged in as {this.props.userResource.read().username}</p>
        </div>
    }
}

export default CurrentUser;
