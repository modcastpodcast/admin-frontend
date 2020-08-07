import React, { Component } from "react";

import "./current_user.scss";

import { getCurrentUser, getUser } from "../../api";
import ProfilePicture from "../profile_picture";
import usePromise from "react-promise-suspense";

class CurrentUser extends Component {
    render() {
        let userData = usePromise(async () => {
            let currentKey = await getCurrentUser();
            let currentUser = await getUser(currentKey.creator);

            return currentUser;
        }, []);

        return <div className="CurrentUser">
            <ProfilePicture id={userData.id} avatar={userData.avatar} size={60} discordSize={128}/>
            <p className="username">Logged in as {userData.username}#{userData.discriminator}</p>
        </div>
    }
}

export default CurrentUser;