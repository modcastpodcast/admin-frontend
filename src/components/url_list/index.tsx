import React, { Component } from "react";
import Modal from "react-modal";

import URL from "../../components/url";

import "./url_list.scss";

import {Link} from "../../types";
import {WrappedPromise} from "../../utils";
import { updateShortURL } from "../../api";

Modal.setAppElement("#root");

interface URLListProps {
    resource: WrappedPromise<Link[]>,
    setRerender: () => any
}

interface URLListState {
    query: string,
    showEditModal: boolean,
    editingURL?: Link,
    edited_short_code?: string,
    edited_long_url?: string
}

class URLList extends Component<Readonly<URLListProps>, URLListState> {
    constructor(props: Readonly<URLListProps>) {
        super(props);

        this.state = {
            query: "",
            showEditModal: false
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.activate = this.activate.bind(this);
        this.handleLongURLEdit = this.handleLongURLEdit.bind(this);
        this.handleShortCodeEdit = this.handleShortCodeEdit.bind(this);
        this.updateURL = this.updateURL.bind(this);
    }

    handleSearch(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            query: event.currentTarget.value
        })
    }

    activate(url: Link) {
        this.setState({
            showEditModal: true,
            editingURL: url,
            edited_short_code: url.short_code,
            edited_long_url: url.long_url
        })
    }

    handleLongURLEdit(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            edited_long_url: event.currentTarget.value
        })
    }

    handleShortCodeEdit(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            edited_short_code: event.currentTarget.value
        })
    }

    updateURL(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        updateShortURL(this.state.editingURL!.short_code, this.state.edited_short_code!, this.state.edited_long_url!).then(() => {
            this.setState({
                showEditModal: false
            });
            this.props.setRerender();
        })
    }

    render() {
        const urls = [];

        for (var url of this.props.resource.read()) {
            if (url.long_url.indexOf(this.state.query) !== -1 || url.short_code.indexOf(this.state.query) !== -1)
                urls.push(<URL key={url.short_code} makeActive={this.activate} setRerender={this.props.setRerender} link={url}/>);
        }

        let editForm;

        if (this.state.editingURL) {
            let link = this.state.editingURL;

            editForm = <form onSubmit={this.updateURL}>
                <h1>Editing {link.short_code}</h1>
                <div className="form-row">
                    <p className="input-label">Short code</p>
                    <input type="text" value={this.state.edited_short_code} onChange={this.handleShortCodeEdit} placeholder="modpod-abcdef"/>
                </div>

                <div className="form-row">
                    <p className="input-label">Long URL</p>
                    <input type="text" value={this.state.edited_long_url} onChange={this.handleLongURLEdit} placeholder="https://modcast.network/..."/>
                </div>

                <div className="form-row">
                    <input className="button primary" type="submit" value="Submit"/>
                </div>

                <button className="button danger" onClick={() => this.setState({showEditModal: false})}>Cancel</button>
            </form>;
        }

        return <div className="urls">
            <Modal
                isOpen={this.state.showEditModal}
                className="Modal"
                overlayClassName="Overlay"
            >
                {editForm}
            </Modal>
            <p className="page-subtitle">{urls.length} short URLs</p>
            <input className="search" placeholder="Search..." value={this.state.query} onChange={this.handleSearch}/>
            {urls}
        </div>
    }
}

export default URLList;