import React, { Component, Suspense } from "react";

import "../pageStyles.scss";

import URLList from "../../components/url_list";

import {getAllURLs} from "../../api";
import { wrapPromise } from "../../utils";

class TokensPage extends Component {
    render() {
        return <div>
            <h1 className="page-title">Tokens</h1>
            <Suspense fallback={<p className="page-subtitle">Loading tokens...</p>}>
                <URLList resource={wrapPromise(getAllURLs())}/>
            </Suspense>
        </div>
    }
}

export default TokensPage;