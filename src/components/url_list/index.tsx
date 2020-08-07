import React, { Component, Suspense } from "react";
import usePromise from "react-promise-suspense";

import "../pageStyles.scss";

import URL from "../../components/url";

import {Link} from "../../types";

interface URLListProps {
    fetchMethod: () => Promise<Link[]>
}

class URLList extends Component<URLListProps> {
    async fetchData() {
        let urls = await this.props.fetchMethod();

        return urls;
    }

    render() {
        const urldata = usePromise(this.fetchData, []);

        for (var url of urldata) {
            urldata.push(<URL key={url.short_code} link={url}/>);
        }

        return <div className="urls">
            {urldata}
        </div>
    }
}

export default AllURLsPage;