import React, { Component } from "react";

import "./RequestLoanFormSubmit.css";

export default class RequestLoanFormSubmit extends Component {
    render() {
        const { disabled } = this.props;

        return (
            <div className="request-form-group">
                <input type="submit" value="Submit" className="request-form-submit" disabled={disabled} />
            </div>
        );
    }
}
