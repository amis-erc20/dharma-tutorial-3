import React, { Component } from "react";

import "./RequestLoanFormInput.css";

export default class RequestLoanFormInput extends Component {
    render() {
        const { label, value, handleInputChange, disabled } = this.props;

        return (
            <div className="request-form-group">
                <label className="request-form-label">{label}</label>
                <input
                    className="request-form-input"
                    name="principal"
                    type="number"
                    value={value}
                    onChange={handleInputChange}
                    disabled={disabled}
                />
            </div>
        );
    }
}
