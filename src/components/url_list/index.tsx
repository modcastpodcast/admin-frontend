import React from "react";

import URL from "../../components/url";

import {Link} from "../../types";
import {WrappedPromise} from "../../utils";

interface URLListProps {
    resource: WrappedPromise<Link[]>
}

function URLList(props: Readonly<URLListProps>) {
    const urls = [];

    for (var url of props.resource.read()) {
        urls.push(<URL key={url.short_code} link={url}/>);
    }

    return <div className="urls">
        <p className="page-subtitle">{urls.length} short URLs</p>
        {urls}
    </div>
}

export default URLList;