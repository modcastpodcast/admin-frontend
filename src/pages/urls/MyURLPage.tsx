import React, { Component, Suspense } from "react";

import "../pageStyles.scss";

import URLList from "../../components/url_list";

import {getMyURLs} from "../../api";
import { wrapPromise } from "../../utils";

class MyURLPage extends Component {
    render() {
        return <div>
            <h1 className="page-title">My URLs</h1>
            <Suspense fallback={<p className="page-subtitle">Loading URLs...</p>}>
                <URLList resource={wrapPromise(getMyURLs())}/>
            </Suspense>
        </div>
    }
}

export default MyURLPage;