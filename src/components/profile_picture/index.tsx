import React, { Component } from "react";

interface ProfilePictureProps {
    id: string,
    avatar: string,
    discordSize: number,
    size: number
}

class ProfilePicture extends Component<ProfilePictureProps, Record<string, unknown>> {
    getURL(): string {
        return `https://cdn.discordapp.com/avatars/${this.props.id}/${this.props.avatar}.png?size=${this.props.discordSize}`;
    }
    render(): JSX.Element {
        return <img alt="" src={this.getURL()} height={this.props.size} width={this.props.size} style={{clipPath: `circle(${this.props.size / 2}px at center)`}}/>
    }
}

export default ProfilePicture;
