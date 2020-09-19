import React, { Component } from "react";

import "./current_user.scss";

import { getCurrentUser, getUser } from "../../api";
import ProfilePicture from "../profile_picture";
import {WrappedPromise, wrapPromise} from "../../utils";
import { User } from "../../types";

interface CurrentUserState {
    dataRequest: WrappedPromise<User>
}

class CurrentUser extends Component<Readonly<{}>, CurrentUserState> {
    constructor(props: Readonly<{}>) {
        super(props);

        const dataRequest = wrapPromise((async () => {
            let currentKey = await getCurrentUser();
            let currentUser = await getUser(currentKey.creator);
        
            return currentUser;
        })())

        this.state = {
            dataRequest,
        }
    }

    render() {
        const userData = this.state.dataRequest.read();

        return <div className="CurrentUser">
            <ProfilePicture id={userData.id} avatar={userData.avatar} size={60} discordSize={128}/>
            <p className="username">Logged in as {userData.username}</p>
        </div>
    }
}

export default CurrentUser;
