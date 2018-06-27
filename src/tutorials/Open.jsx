import React, { Component } from "react";

import { RequestLoanForm } from "../components/RequestLoanForm/RequestLoanForm";

export default class Open extends Component {
    render() {
        const { isAwaitingBlockchain } = this.props;
        const { createDebtOrder } = this.props;

        return (
            <div className="OpenTutorial">
                <header className="App-header">
                    <h1 className="App-title">Request a Loan on Dharma</h1>
                </header>

                <RequestLoanForm
                    createDebtOrder={createDebtOrder}
                    isAwaitingBlockchain={isAwaitingBlockchain}
                />
            </div>
        );
    }
}
