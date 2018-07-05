import React, { Component } from "react";

import { Button } from "../Button/Button";

import { debtorAddress } from "../../constants";

export default class Repay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasAllowedRepayments: false,
            debtOrderFilled: false
        };

        this.handleAllowRepayments = this.handleAllowRepayments.bind(this);
        this.handleMakeRepayment = this.handleMakeRepayment.bind(this);
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

        await updateBlockchainStatus();
    }

    render() {
        const { debtOrder } = this.props;
        const { hasAllowedRepayments, debtOrderFilled } = this.state;

        const disableAllowRepayments = !debtOrder || !debtOrderFilled || hasAllowedRepayments;

        return (
            <div className="RepayTutorial container Tutorial" id="fill-loan">
                <header className="App-header">
                    <h3 className="App-title">Make Repayments</h3>
                </header>

                <Button
                    disabled={disableAllowRepayments}
                    label={"Allow Repayments"}
                    onClick={this.handleAllowRepayments}
                />

                <Button
                    disabled={!hasAllowedRepayments}
                    label={"Make a Repayment"}
                    onClick={this.handleMakeRepayment}
                />
            </div>
        );
    }
}
