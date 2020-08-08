import React, { Component } from "react";
import moment from "moment";

import "./url.scss";

import { Link, APIKey } from "../../types";
import ProfilePicture from "../profile_picture";

import trash from "./trash.svg";
import { wrapPromise, WrappedPromise } from "../../utils";
import { getCurrentUser, deleteShortURL } from "../../api";

interface URLProps  {
    link: Link,
    setRerender: () => any
}

const currentUser: WrappedPromise<APIKey> = wrapPromise(getCurrentUser());

class URL extends Component<URLProps, {}> {
    constructor(props: URLProps) {
        super(props);

        this.deleteLink = this.deleteLink.bind(this);
    }

    formatCreated() {
        let now = moment.utc();
        let duration = moment.duration(now.diff(moment(this.props.link.creation_date)))

        return duration.humanize({
            d: 7,
            w: 4
        });
    }

    deleteLink() {
        deleteShortURL(this.props.link.short_code).then(() => this.props.setRerender());
    }

    render() {
        let deleteButton;

        if (this.props.link.creator.id == currentUser.read().creator || currentUser.read().is_admin) {
            deleteButton = <a onClick={this.deleteLink} className="deleteButton"><img src={trash} width={20}/></a>;
        }

        return <div className="URL">
            {deleteButton}
            <h2 className="shortCode">{this.props.link.short_code}</h2>
            <p className="longURL">Points to <a href={this.props.link.long_url}>{this.props.link.long_url}</a></p>
            <p className="creator">Created by <ProfilePicture id={this.props.link.creator.id} avatar={this.props.link.creator.avatar} size={32} discordSize={64}/> <strong>{this.props.link.creator.username}#{this.props.link.creator.discriminator}</strong></p>
            <p>{this.props.link.clicks} clicks • Created {this.formatCreated()} ago</p>
        </div>
    }
}

export default URL;