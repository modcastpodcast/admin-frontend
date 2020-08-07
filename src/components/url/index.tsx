import React, { Component } from "react";
import moment from "moment";

import "./url.scss";

import { Link } from "../../types";
import ProfilePicture from "../profile_picture";

interface URLProps  {
    link: Link
}

class URL extends Component<URLProps, {}> {
    formatCreated() {
        let now = moment.utc();
        let duration = moment.duration(now.diff(moment(this.props.link.creation_date)))

        return duration.humanize({
            d: 7,
            w: 4
        });
    }

    render() {
        return <div className="URL">
            <h2 className="shortCode">{this.props.link.short_code}</h2>
            <p className="longURL">Points to <a href={this.props.link.long_url}>{this.props.link.long_url}</a></p>
            <p className="creator">Created by <ProfilePicture id={this.props.link.creator.id} avatar={this.props.link.creator.avatar} size={32} discordSize={64}/> <strong>{this.props.link.creator.username}#{this.props.link.creator.discriminator}</strong></p>
            <p>{this.props.link.clicks} clicks • Created {this.formatCreated()} ago</p>
        </div>
    }
}

export default URL;