import React, { Component } from "react";
import moment from "moment";

import "./url.scss";

import { Link, APIKey } from "../../types";
import ProfilePicture from "../profile_picture";

import trash from "./trash.svg";
import edit from "./edit.svg";
import users from "./users.svg";

import { WrappedPromise } from "../../utils";
import { deleteShortURL, transferShortURL } from "../../api";

interface URLProps  {
    link: Link,
    setRerender: () => any,
    makeActive: (url: Link) => any,
    currentUser: WrappedPromise<APIKey>
}

class URL extends Component<URLProps, {}> {
    constructor(props: URLProps) {
        super(props);

        this.deleteLink = this.deleteLink.bind(this);
        this.editLink = this.editLink.bind(this);
        this.transferLink = this.transferLink.bind(this);
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

    editLink() {
        this.props.makeActive(this.props.link);
    }

    transferLink() {
        let newCreator = prompt("Please enter the user ID of the new owner:", this.props.link.creator.id);

        if (newCreator) {
            transferShortURL(this.props.link.short_code, newCreator).then(resp => {
                if (resp.status !== "success") {
                    return alert(resp.message);
                }

                this.props.setRerender();
            })
        }
    }

    render() {
        let actionButtons;

        if (this.props.link.creator.id === this.props.currentUser.read().creator) {
            actionButtons = <div className="actions">
                <button onClick={this.deleteLink} className="deleteButton"><img alt="delete short url" src={trash} width={20}/></button>
                <button onClick={this.editLink} className="deleteButton"><img alt="delete short url" src={edit} width={20}/></button>
            </div>;
        }

        if (this.props.currentUser.read().is_admin) {
            actionButtons = <div className="actions">
                <button onClick={this.deleteLink} className="deleteButton"><img alt="delete short url" src={trash} height={20} width={20}/></button>
                <button onClick={this.editLink} className="deleteButton"><img alt="delete short url" src={edit} height={20} width={20}/></button>
                <button onClick={this.transferLink} className="deleteButton"><img alt="delete short url" src={users} height={20} width={20}/></button>
            </div>;
        }

        return <div className="URL">
            {actionButtons}
            <h2 className="shortCode">{this.props.link.short_code}</h2>
            <p className="longURL">Points to <a href={this.props.link.long_url}>{this.props.link.long_url}</a></p>
            <p className="notes">{this.props.link.notes}</p>
            <p className="creator">Created by <ProfilePicture id={this.props.link.creator.id} avatar={this.props.link.creator.avatar} size={32} discordSize={64}/> <strong>{this.props.link.creator.username}#{this.props.link.creator.discriminator}</strong></p>
            <p>{this.props.link.clicks} clicks • Created {this.formatCreated()} ago</p>
        </div>
    }
}

export default URL;
