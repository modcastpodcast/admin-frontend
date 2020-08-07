import React, { Component } from "react";

interface ProfilePictureProps {
    id: string,
    avatar: string,
    discordSize: number,
    size: number
}

class ProfilePicture extends Component<ProfilePictureProps, {}> {
    getURL() {
        return `https://cdn.discordapp.com/avatars/${this.props.id}/${this.props.avatar}.png?size=${this.props.discordSize}`;
    }
    render() {
        return <img src={this.getURL()} width={this.props.size} style={{clipPath: `circle(${this.props.size / 2}px at center)`}}/>
    }
}

export default ProfilePicture;