import React, { Component } from "react";

import URL from "../../components/url";

import "./url_list.scss";

import {Link} from "../../types";
import {WrappedPromise} from "../../utils";

interface URLListProps {
    resource: WrappedPromise<Link[]>,
    setRerender: () => any
}

interface URLListState {
    query: string
}

class URLList extends Component<Readonly<URLListProps>, URLListState> {
    constructor(props: Readonly<URLListProps>) {
        super(props);

        this.state = {
            query: ""
        }

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            query: event.currentTarget.value
        })
    }

    render() {
        const urls = [];

        for (var url of this.props.resource.read()) {
            if (url.long_url.indexOf(this.state.query) != -1 || url.short_code.indexOf(this.state.query) != -1)
            urls.push(<URL key={url.short_code} setRerender={this.props.setRerender} link={url}/>);
        }

        return <div className="urls">
            <p className="page-subtitle">{urls.length} short URLs</p>
            <input className="search" placeholder="Search..." value={this.state.query} onChange={this.handleSearch}/>
            {urls}
        </div>
    }
}

export default URLList;