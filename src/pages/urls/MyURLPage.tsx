import React, { Component, Suspense } from "react";

import Modal from "react-modal";

import "../pageStyles.scss";

import URLList from "../../components/url_list";

import ShortCodeForm from "../../components/short_code_creation";

import {getMyURLs} from "../../api";
import { wrapPromise } from "../../utils";

interface MyURLPageState {
    showCreationModal: boolean,
    rerender: number
}

class MyURLPage extends Component<Readonly<{}>, MyURLPageState> {
    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            showCreationModal: false,
            rerender: 0
        }

        this.displayModal = this.displayModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    displayModal() {
        this.setState({
            showCreationModal: true
        })
    }

    hideModal() {
        this.setState({
            showCreationModal: false
        })
    }

    render() {
        return <div>
            <Modal 
                isOpen={this.state.showCreationModal}
                className="Modal"
                overlayClassName="Overlay"
            >
                <ShortCodeForm setRerender={() => this.setState({rerender: this.state.rerender + 1})} closeFunction={this.hideModal}/>
            </Modal>
            <h1 className="page-title">My URLs</h1>
            <button onClick={this.displayModal} className="button primary">Create new short code</button>
            <Suspense fallback={<p className="page-subtitle">Loading URLs...</p>}>
                <URLList resource={wrapPromise(getMyURLs())} setRerender={() => this.setState({rerender: this.state.rerender + 1})}/>
            </Suspense>
        </div>
    }
}

export default MyURLPage;