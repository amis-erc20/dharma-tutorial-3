import React, { Component } from "react";
import NavItem from "./NavItem";

export default class Nav extends Component {
    render() {
        return (
            <div className="nav nav-pills sticky-top" id="v-pills-tab"
                 role="tablist" aria-orientation="vertical">
                <NavItem title="Request a Loan on Dharma" linkId="request-loan" />
                <NavItem title="Fill a Loan on Dharma" linkId="fill-loan" />
            </div>
        );
    }
}
