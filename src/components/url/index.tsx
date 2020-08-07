import React, { Component } from "react";
import moment from "moment";

import "./url.scss";

interface URLProps  {
    shortCode: string,
    longURL: string,
    clicks: number,
    // creator: number,
    creationDate: Date
}

class URL extends Component<URLProps, {}> {
    formatCreated() {
        let now = moment.utc();
        let duration = moment.duration(now.diff(moment(this.props.creationDate)))

        return duration.humanize({
            d: 7,
            w: 4
        });
    }

    render() {
        return <div className="URL">
            <h2 className="shortCode">{this.props.shortCode}</h2>
            <p className="longURL">Points to <a href={this.props.longURL}>{this.props.longURL}</a></p>
            <p className="creator">Created by <img src="https://cdn.discordapp.com/avatars/249287049482338305/44b9747e477ca7a78d8f4f0f1dffbb23.png?size=64"/> <strong>Panley#8008</strong></p>
            <p>{this.props.clicks} clicks • Created {this.formatCreated()} ago</p>
        </div>
    }
}

export default URL;