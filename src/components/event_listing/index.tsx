import React, { Component } from "react";

import "./event.scss";

import { Event as CalendarEvent } from "../../types";
import ProfilePicture from "../profile_picture";

interface EventListingProps  {
    event: CalendarEvent
}

class EventListing extends Component<EventListingProps, Record<string, unknown>> {
    render(): JSX.Element {
        return <div className="Event">
            <h2 className="title">{this.props.event.title}</h2>
            <p className="creator">Created by <ProfilePicture id={this.props.event.creator.id} avatar={this.props.event.creator.avatar} size={32} discordSize={64}/> <strong>{this.props.event.creator.username}#{this.props.event.creator.discriminator}</strong> • {this.props.event.repeatConfiguration === "once" ? "Does not repeat" : "Repeats " + this.props.event.repeatConfiguration}</p>
        </div>
    }
}

export default EventListing;
