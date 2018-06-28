import React, { Component } from "react";

import { AllowPrincipalTransfer } from "../components/CreditorForm/AllowPrincipalTransfer";
import { FillLoan } from "../components/CreditorForm/FillLoan";

export default class Fill extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasGrantedTransfer: false
        };

        this.handleAllowPrincipalTransfer = this.handleAllowPrincipalTransfer.bind(this);
    }

    async handleAllowPrincipalTransfer(event) {
        event.preventDefault();

        const { debtOrder } = this.props;

        await debtOrder.allowPrincipalTransfer();

        this.setState({ hasGrantedTransfer: true });
    }

    render() {
        const { debtOrder, updateBlockchainStatus } = this.props;
        const { hasGrantedTransfer } = this.state;

        const disableAllowTransfer = !debtOrder || hasGrantedTransfer;

        return (
            <div className="FillTutorial container" id="fill-loan">
                <header className="App-header">
                    <h3 className="App-title">Fill a Loan on Dharma</h3>
                </header>

                <AllowPrincipalTransfer
                    handleAllowPrincipalTransfer={this.handleAllowPrincipalTransfer}
                    debtOrder={debtOrder}
                    disabled={disableAllowTransfer}
                />

                <FillLoan
                    debtOrder={debtOrder}
                    disabled={!hasGrantedTransfer}
                    updateBlockchainStatus={updateBlockchainStatus}
                />
            </div>
        );
    }
}
