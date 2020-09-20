import React, { Component, Suspense } from "react";

import Modal from "react-modal";

import "../pageStyles.scss";
import {getAllUsers} from "../../api";
import { wrapPromise } from "../../utils";
import { User } from "../../types";
import UserRow from "../../components/user";

import UserForm from "../../components/user_creation_form";

Modal.setAppElement("#root");

const userListResource = wrapPromise(getAllUsers());

interface UsersPageState {
    showCreationModal: boolean
}

function Users() {

    return <div>
        <p className="page-subtitle">{userListResource.read().length} registered users</p>
        {
            userListResource.read().map((user: User) => {
                return <UserRow key={user.id} user={user}/>
            })
        }
    </div>
}

class UsersPage extends Component<Readonly<Record<string, unknown>>, UsersPageState> {
    constructor(props: Readonly<Record<string, unknown>>) {
        super(props);

        this.state = {
            showCreationModal: false
        }

        this.displayModal = this.displayModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    displayModal(): void {
        this.setState({
            showCreationModal: true
        })
    }

    hideModal(): void {
        this.setState({
            showCreationModal: false
        })
    }

    render(): JSX.Element {
        return <div>
            <h1 className="page-title">User accounts</h1>
            <Modal 
                isOpen={this.state.showCreationModal}
                className="Modal"
                overlayClassName="Overlay"
            >
                <UserForm closeFunction={this.hideModal}/>
            </Modal>
            <Suspense fallback={<p className="page-subtitle">Loading user accounts...</p>}>
                <button onClick={this.displayModal} className="button primary">Create new user</button>
                <Users/>
            </Suspense>
        </div>
    }
}

export default UsersPage;
