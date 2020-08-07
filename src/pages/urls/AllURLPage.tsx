import React, { Component } from "react";

import "../pageStyles.scss";

import URL from "../../components/url";

class AllURLsPage extends Component {
    render() {
        return <div>
            <h1 className="page-title">All URLs</h1>
            <div className="urls">
                <URL shortCode="modpod-web" longURL="https://discord.gg/modpod?utm_source=blog&utm_medium=banner&utm_campaign=soft_launch" clicks={20} creationDate={new Date(1596212695 * 1000)}/>
                <URL shortCode="modpod-dmd" longURL="https://discord.gg/k3erZ4b?utm_source=dmd&amp;utm_medium=post&amp;utm_campaign=soft_launch" clicks={35} creationDate={new Date(1596212611 * 1000)}/>
            </div>
        </div>
    }
}

export default AllURLsPage;