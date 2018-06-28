import React, { Component } from "react";

export default class NavItem extends Component {
    render() {
        const { title, linkId } = this.props;

        return (
            <a className="nav-link" id={`v-pills-${linkId}-tab`}
               data-toggle="pill" href={`#${linkId}`} role="tab"
               aria-controls={`v-pills-${linkId}`}>{title}</a>
        );
    }
}
