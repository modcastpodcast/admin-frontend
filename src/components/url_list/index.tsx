import React, { Component } from "react";
import Modal from "react-modal";

import URL from "../../components/url";

import "./url_list.scss";

import {Link} from "../../types";
import {WrappedPromise, wrapPromise} from "../../utils";
import { getCurrentUser, updateShortURL } from "../../api";

Modal.setAppElement("#root");

interface URLListProps {
    resource: WrappedPromise<Link[]>,
    setRerender: () => void
}

interface URLListState {
    query: string,
    showEditModal: boolean,
    editingURL?: Link,
    edited_short_code?: string,
    edited_long_url?: string,
    edited_notes?: string
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
        this.handleNotesEdit = this.handleNotesEdit.bind(this);
        this.updateURL = this.updateURL.bind(this);
    }

    handleSearch(event: React.FormEvent<HTMLInputElement>): void {
        this.setState({
            query: event.currentTarget.value
        })
    }

    activate(url: Link): void {
        this.setState({
            showEditModal: true,
            editingURL: url,
            edited_short_code: url.short_code,
            edited_long_url: url.long_url,
            edited_notes: url.notes
        })
    }

    handleLongURLEdit(event: React.FormEvent<HTMLInputElement>): void {
        this.setState({
            edited_long_url: event.currentTarget.value
        })
    }

    handleShortCodeEdit(event: React.FormEvent<HTMLInputElement>): void {
        this.setState({
            edited_short_code: event.currentTarget.value
        })
    }

    handleNotesEdit(event: React.FormEvent<HTMLInputElement>): void {
        this.setState({
            edited_notes: event.currentTarget.value
        })
    }

    updateURL(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        if (!this.state.editingURL || !this.state.edited_short_code || !this.state.edited_long_url || !this.state.edited_notes) {
            return;
        }

        updateShortURL(this.state.editingURL.short_code, this.state.edited_short_code, this.state.edited_long_url, this.state.edited_notes).then(() => {
            this.setState({
                showEditModal: false
            });
            this.props.setRerender();
        })
    }

    render(): JSX.Element {
        const userRequest = wrapPromise(getCurrentUser());
        const urls = [];

        const q = this.state.query.toLowerCase();

        for (const url of this.props.resource.read()) {
            if (
                url.long_url.toLowerCase().indexOf(q) !== -1
                || url.short_code.toLowerCase().indexOf(q) !== -1
                || url.notes.toLowerCase().indexOf(q) !== -1
            )
                urls.push(<URL key={url.short_code} makeActive={this.activate} setRerender={this.props.setRerender} currentUser={userRequest} link={url}/>);
        }

        let editForm;

        if (this.state.editingURL) {
            const link = this.state.editingURL;

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
                    <p className="input-label">Notes</p>
                    <input type="text" value={this.state.edited_notes} onChange={this.handleNotesEdit} placeholder="A link about..."/>
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
