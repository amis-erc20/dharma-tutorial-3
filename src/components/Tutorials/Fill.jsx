import React, { Component } from "react";

import { AllowPrincipalTransfer } from "../CreditorForm/AllowPrincipalTransfer";
import { FillLoan } from "../CreditorForm/FillLoan";

import { creditorAddress } from "../../constants";

export default class Fill extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasGrantedTransfer: false
        };

        this.handleAllowPrincipalTransfer = this.handleAllowPrincipalTransfer.bind(this);
        this.handleFillLoan = this.handleFillLoan.bind(this);
    }

    async handleAllowPrincipalTransfer(event) {
        event.preventDefault();

        const { debtOrder } = this.props;

        await debtOrder.allowPrincipalTransfer(creditorAddress);

        this.setState({ hasGrantedTransfer: true });
    }

    async handleFillLoan(event) {
        event.preventDefault();

        const { debtOrder, updateBlockchainStatus } = this.props;

        await debtOrder.fill(creditorAddress);

        await updateBlockchainStatus();
    }

    render() {
        const { debtOrder, updateBlockchainStatus, debtOrderFilled } = this.props;
        const { hasGrantedTransfer } = this.state;

        const disableAllowTransfer = !debtOrder || hasGrantedTransfer;
        const disableFill = !hasGrantedTransfer || debtOrderFilled;

        return (
            <div className="FillTutorial container Tutorial" id="fill-loan">
                <header className="App-header">
                    <h3 className="App-title">Fill a Loan on Dharma</h3>
                </header>

                <AllowPrincipalTransfer
                    handleAllowPrincipalTransfer={this.handleAllowPrincipalTransfer}
                    debtOrder={debtOrder}
                    disabled={disableAllowTransfer}
                />

                <FillLoan
                    handleFillLoan={this.handleFillLoan}
                    debtOrder={debtOrder}
                    disabled={disableFill}
                    updateBlockchainStatus={updateBlockchainStatus}
                />
            </div>
        );
    }
}
