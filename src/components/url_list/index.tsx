import React, { Component } from "react";

import URL from "../../components/url";

import {Link} from "../../types";
import {WrappedPromise} from "../../utils";

interface URLListProps {
    resource: WrappedPromise<Link[]>,
    setRerender: () => any
}

class URLList extends Component<Readonly<URLListProps>, {}> {
    render() {
        const urls = [];

        for (var url of this.props.resource.read()) {
            urls.push(<URL key={url.short_code} setRerender={this.props.setRerender} link={url}/>);
        }

        return <div className="urls">
            <p className="page-subtitle">{urls.length} short URLs</p>
            {urls}
        </div>
    }
}

export default URLList;