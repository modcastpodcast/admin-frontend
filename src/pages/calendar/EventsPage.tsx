import React, { Component, Suspense } from "react";

import Modal from "react-modal";

import "../pageStyles.scss";

import EventListing from "../../components/event_listing";

import moment from "moment";

import lodash from "lodash";

import {toast} from "react-toastify";

import {fetchCalendarEvents} from "../../api";
import { WrappedPromise, wrapPromise } from "../../utils";

Modal.setAppElement("#root");

interface EventListProps {
    eventResource: WrappedPromise<any[]>
}

class EventList extends Component<EventListProps, {}> {
    render() {
        const events = this.props.eventResource.read();

        let grouped = lodash.groupBy(events, "date");

        const sections = [];

        for (var date of Object.keys(grouped)) {
            const sectionEvents = [];

            for (var event of grouped[date]) {
                sectionEvents.push(<EventListing key={event.id} event={event}></EventListing>)
            }

            let formattedDate = moment(date).format('dddd Do MMMM YYYY');

            sections.push(<div key={date} className="section">
                <h1>{formattedDate}</h1>
                {sectionEvents}
            </div>)
        }

        return <div>{sections}</div>
    }
}

interface EventsPageState {
    showCreationModal: boolean
}

class EventsPage extends Component<Readonly<{}>, EventsPageState> {
    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            showCreationModal: false
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

    copyCalendar() {
        let url = `https://modpod.live/api/calendar/ical?token=${localStorage.token}`;
        navigator.clipboard.writeText(url).then(() => {
            toast.dark(
                <p>Copied to clipboard! Make sure not to share this URL with <em><strong>anyone</strong></em>.</p>
            )
        }).catch(() => {
            toast.error(
                "Could not copy to clipboard"
            )
        })
    }

    render() {
        return <div>
            <Modal 
                isOpen={this.state.showCreationModal}
                className="Modal"
                overlayClassName="Overlay"
            >
                <h1>Create a new event</h1>
            </Modal>
            <h1 className="page-title">Social Calendar</h1>
            <button onClick={this.copyCalendar} className="button primary">Copy my calendar URL</button>
            <Suspense fallback={<p className="page-subtitle">Loading events...</p>}>
                <EventList eventResource={wrapPromise(fetchCalendarEvents())}/>
            </Suspense>
        </div>
    }
}

export default EventsPage;
