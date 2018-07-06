import React, { Component } from "react";

import { Button } from "../Button/Button";

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
        const { debtOrder, isDebtOrderFilled } = this.props;
        const { hasGrantedTransfer } = this.state;

        const disableAllowTransfer = !debtOrder || hasGrantedTransfer;
        const disableFill = !hasGrantedTransfer || isDebtOrderFilled;

        return (
            <div className="FillTutorial container Tutorial" id="fill-loan">
                <header className="App-header">
                    <h3 className="App-title">Fill a Loan on Dharma</h3>
                </header>
                <Button
                    disabled={disableAllowTransfer}
                    label={"Allow Principal Transfer"}
                    onClick={this.handleAllowPrincipalTransfer}
                />
                <Button disabled={disableFill} label={"Fill Loan Request"} onClick={this.handleFillLoan} />
            </div>
        );
    }
}
