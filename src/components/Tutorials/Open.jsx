import React, { Component } from "react";

import { RequestLoanForm } from "../RequestLoanForm/RequestLoanForm";

export default class Open extends Component {
    render() {
        const { createDebtOrder, disableForm } = this.props;

        return (
            <div className="OpenTutorial container" id="open-loan">
                <header className="App-header">
                    <h3 className="App-title">Request a Loan on Dharma</h3>
                </header>

                <RequestLoanForm createDebtOrder={createDebtOrder} disableForm={disableForm} />
            </div>
        );
    }
}
