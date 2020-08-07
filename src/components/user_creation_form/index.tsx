import React, { Component } from "react";

import "./form.scss";

import {createUserAccount} from "../../api";

interface UserFormState {
    accountID: string,
    administrator: boolean
}

interface UserFormProps {
    closeFunction: () => void
}

class UserForm extends Component<UserFormProps, UserFormState> {
    constructor(props: Readonly<UserFormProps>) {
        super(props);

        this.state = {
            accountID: "",
            administrator: false
        }

        this.handleAccountIDChange = this.handleAccountIDChange.bind(this);
        this.handleAdministratorChange = this.handleAdministratorChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        createUserAccount(this.state.accountID, this.state.administrator).then(resp => {
            if (resp.status === "success") {
                document.location.reload();
            } else {
                alert(resp.message)
            }
        })
    }

    handleAccountIDChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            accountID: event.currentTarget.value
        })
    }

    handleAdministratorChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            administrator: event.currentTarget.checked
        })
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <h1 className="page-title">Create user</h1>
            <div className="form-row">
                <p className="input-label">User ID</p>
                <input type="text" value={this.state.accountID} onChange={this.handleAccountIDChange} placeholder="112233445566778899"/>
            </div>

            <div className="form-row">
                <label className="checkbox">Administrator
                    <input name="needs_oauth" type="checkbox" onChange={this.handleAdministratorChange} checked={this.state.administrator}/>
                    <span className="checkmark"></span>
                </label>
            </div>

            <div className="form-row">
                <input className="button primary" type="submit" value="Submit"/>
            </div>
            <button className="button danger" onClick={this.props.closeFunction}>Cancel</button>
        </form>
    }
}

export default UserForm;