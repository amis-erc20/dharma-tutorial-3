import React, { Component } from "react";

import RequestLoanFormInput from "./RequestLoanFormInput";
import RequestLoanFormSubmit from "./RequestLoanFormSubmit";

import "./RequestLoanForm.css";

export class RequestLoanForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            principal: 0,
            collateral: 0,
            expiration: 0,
            termLength: 0
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.createDebtOrder(this.state);
    }

    render() {
        const { isAwaitingBlockchain } = this.props;
        const { principal, collateral, expiration, termLength } = this.state;

        return (
            <form className="request-form" onSubmit={this.handleSubmit}>
                <RequestLoanFormInput
                    label="Principal"
                    value={principal}
                    disabled={isAwaitingBlockchain}
                    handleInputChange={this.handleInputChange}
                />

                <RequestLoanFormInput
                    label="Collateral Amount"
                    value={collateral}
                    disabled={isAwaitingBlockchain}
                    handleInputChange={this.handleInputChange}
                />

                <RequestLoanFormInput
                    label="Expiration"
                    value={expiration}
                    disabled={isAwaitingBlockchain}
                    handleInputChange={this.handleInputChange}
                />

                <RequestLoanFormInput
                    label="Term Length"
                    value={termLength}
                    disabled={isAwaitingBlockchain}
                    handleInputChange={this.handleInputChange}
                />

                <RequestLoanFormSubmit disabled={isAwaitingBlockchain} />
            </form>
        );
    }
}
