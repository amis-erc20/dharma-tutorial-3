import React, { Component } from "react";

import { AllowRepayments } from "../Repayment/AllowRepayments";
import { MakeRepayment } from "../Repayment/MakeRepayment";

import { debtorAddress } from "../../constants";

export default class Repay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasAllowedRepayments: false
        };

        this.handleAllowRepayments = this.handleAllowRepayments.bind(this);
        this.handleMakeRepayment = this.handleMakeRepayment.bind(this);
    }

    async handleAllowRepayments(event) {
        event.preventDefault();

        const { debtOrder } = this.props;

        await debtOrder.allowRepayments(debtorAddress);

        this.setState({ hasAllowedRepayments: true });
    }

    async handleMakeRepayment(event) {
        event.preventDefault();

        const { debtOrder, updateBlockchainStatus } = this.props;

        await debtOrder.makeRepayment();

        // TODO: await txn mined

        updateBlockchainStatus();
    }

    render() {
        const { debtOrder, debtOrderFilled } = this.props;
        const { hasAllowedRepayments } = this.state;

        const disableAllowRepayments = !debtOrder || !debtOrderFilled || hasAllowedRepayments;

        return (
            <div className="RepayTutorial container Tutorial" id="fill-loan">
                <header className="App-header">
                    <h3 className="App-title">Make Repayments</h3>
                </header>

                <AllowRepayments
                    handleAllowRepayments={this.handleAllowRepayments}
                    debtOrder={debtOrder}
                    disabled={disableAllowRepayments}
                />

                <MakeRepayment
                    debtOrder={debtOrder}
                    disabled={!hasAllowedRepayments}
                    handleMakeRepayment={this.handleMakeRepayment}
                />
            </div>
        );
    }
}
