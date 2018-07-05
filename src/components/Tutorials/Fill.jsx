import React, { Component } from "react";

import { AllowPrincipalTransfer } from "../CreditorForm/AllowPrincipalTransfer";
import { FillLoan } from "../CreditorForm/FillLoan";

import { creditorAddress } from "../../constants";

export default class Fill extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasGrantedTransfer: false,
            debtOrderFilled: false
        };

        this.handleAllowPrincipalTransfer = this.handleAllowPrincipalTransfer.bind(this);
        this.handleFillLoan = this.handleFillLoan.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { debtOrder } = nextProps;

        if (!debtOrder) {
            return {};
        }

        this.getLoanSummary(debtOrder).then(data => {
            this.setState(data);
        });
    }

    async getLoanSummary(debtOrder) {
        const debtOrderFilled = await debtOrder.isFilled();

        return { debtOrderFilled };
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
        const { debtOrder, updateBlockchainStatus } = this.props;
        const { hasGrantedTransfer, debtOrderFilled } = this.state;

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
