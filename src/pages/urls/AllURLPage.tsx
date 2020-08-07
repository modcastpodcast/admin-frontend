import React, { Component, Suspense } from "react";

import "../pageStyles.scss";

import URLList from "../../components/url_list";

import {getAllURLs} from "../../api";
import { wrapPromise } from "../../utils";

class AllURLsPage extends Component {
    render() {
        return <div>
            <h1 className="page-title">All URLs</h1>
            <Suspense fallback={<p className="page-subtitle">Loading URLs...</p>}>
                <URLList resource={wrapPromise(getAllURLs())}/>
            </Suspense>
        </div>
    }
}

export default AllURLsPage;