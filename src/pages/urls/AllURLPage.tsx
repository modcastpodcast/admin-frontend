import React, { Component, Suspense } from "react";

import "../pageStyles.scss";

import URLList from "../../components/url_list";

import {getAllURLs} from "../../api";

class AllURLsPage extends Component {
    render() {
        return <div>
            <h1 className="page-title">All URLs</h1>
            <Suspense fallback={<h1>Loading...</h1>}>
                <URLList fetchMethod={getAllURLs}/>
            </Suspense>
        </div>
    }
}

export default AllURLsPage;