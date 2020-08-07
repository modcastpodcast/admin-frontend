import React, { Component } from "react";

import "../pageStyles.scss";

import URL from "../../components/url";
import {Link} from "../../types";

import {getAllURLs, redirectToAuthorize} from "../../api";

interface AllURLsPageState {
    urls: Link[]
}

class AllURLsPage extends Component<Readonly<{}>, AllURLsPageState> {
    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            urls: []
        }
    }

    componentDidMount() {
        getAllURLs().then(links => {
            this.setState({
                urls: links
            })
        }).catch(() => {
            redirectToAuthorize()
        })
    }

    render() {
        const urldata: URL[] = [];

        for (var url of this.state.urls) {
            <URL link={url}/>
        }

        return <div>
            <h1 className="page-title">All URLs</h1>
            <div className="urls">
                {urldata}
            </div>
        </div>
    }
}

export default AllURLsPage;