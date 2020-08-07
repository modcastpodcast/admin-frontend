import React, { Component } from "react";

import "./current_user.scss";

class CurrentUser extends Component {
    render() {
        return <div className="CurrentUser">
            <img className="avatar" src="https://cdn.discordapp.com/avatars/165023948638126080/65cfad562e0785364f5ef8c79fcd734b.png?size=256" width={60}></img>
            <p className="username">Logged in as joe#6000</p>
        </div>
    }
}

export default CurrentUser;