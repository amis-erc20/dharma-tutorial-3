import React, { Component } from "react";
import NavItem from "./NavItem";

import "./Nav.css";

export default class Nav extends Component {
    render() {
        return (
            <div className="nav nav-pills Nav" id="v-pills-tab"
                 role="tablist" aria-orientation="vertical">
                <NavItem title="Request a Loan" linkId="request-loan" />
                <NavItem title="Fill a Loan" linkId="fill-loan" />
            </div>
        );
    }
}
