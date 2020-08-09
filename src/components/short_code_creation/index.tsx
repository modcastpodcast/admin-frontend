import React, { Component } from "react";

import "../../form.scss";

import {createShortURL} from "../../api";

interface UserFormState {
    shortCode: string,
    longURL: string,
    notes: string
}

interface UserFormProps {
    closeFunction: () => void,
    setRerender: () => any
}

class CreateShortCode extends Component<UserFormProps, UserFormState> {
    constructor(props: Readonly<UserFormProps>) {
        super(props);

        this.state = {
            shortCode: "",
            longURL: "",
            notes: ""
        }

        this.handleShortCodeChange = this.handleShortCodeChange.bind(this);
        this.handleLongURLChange = this.handleLongURLChange.bind(this);
        this.handleNotesChange = this.handleNotesChange.bind(this)

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        createShortURL(this.state.shortCode, this.state.longURL, this.state.notes).then(resp => {
            if (resp.status === "success") {
                this.props.setRerender();
                this.props.closeFunction();
            } else {
                alert(resp.message)
            }
        })
    }

    handleShortCodeChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            shortCode: event.currentTarget.value
        })
    }

    handleLongURLChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            longURL: event.currentTarget.value
        })
    }

    handleNotesChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            notes: event.currentTarget.value
        })
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <h1 className="page-title">Create short URL</h1>
            <div className="form-row">
                <p className="input-label">Short code</p>
                <input type="text" value={this.state.shortCode} onChange={this.handleShortCodeChange} placeholder="modpod-abcdef"/>
            </div>

            <div className="form-row">
                <p className="input-label">Long URL</p>
                <input type="text" value={this.state.longURL} onChange={this.handleLongURLChange} placeholder="https://modcast.network/..."/>
            </div>

            <div className="form-row">
                <p className="input-label">Notes</p>
                <input type="text" value={this.state.notes} onChange={this.handleNotesChange} placeholder="Notes on the link..."/>
            </div>

            <div className="form-row">
                <input className="button primary" type="submit" value="Submit"/>
            </div>
            <button className="button danger" onClick={this.props.closeFunction}>Cancel</button>
        </form>
    }
}

export default CreateShortCode;