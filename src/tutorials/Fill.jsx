import React, { Component } from "react";

import { CreditorForm } from "../components/CreditorForm/CreditorForm";

export default class Fill extends Component {
    render() {
        const { debtOrder } = this.props;

        return (
            <div className="FillTutorial">
                <header className="App-header">
                    <h1 className="App-title">Fill a Loan on Dharma</h1>
                </header>

                <CreditorForm debtOrder={debtOrder} />
            </div>
        );
    }
}
