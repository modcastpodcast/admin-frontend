import React, { Component } from "react";
import { useParams, Redirect } from "react-router-dom";


function TokenSavePage() {
        let {token} = useParams();

        localStorage.token = token;

        return <Redirect to="/"></Redirect>
}

export default TokenSavePage;