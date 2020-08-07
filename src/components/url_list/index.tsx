import React, { Component } from "react";
import usePromise from "react-promise-suspense"

import URL from "../../components/url";

import {Link} from "../../types";

interface URLListProps {
    fetchMethod: () => Promise<Link[]>
}

class URLList extends Component<URLListProps> {
    render() {
        const urldata = usePromise(this.props.fetchMethod, []);

        const urls = [];

        for (var url of urldata) {
            urls.push(<URL key={url.short_code} link={url}/>);
        }

        return <div className="urls">
            {urls}
        </div>
    }
}

export default URLList;