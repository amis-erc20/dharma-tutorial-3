import React, { Component } from "react";
import Dharma from "@dharmaprotocol/dharma.js";

import { RequestLoanForm } from "../RequestLoanForm/RequestLoanForm";

import "./App.css";

// Instantiate a new instance of Dharma, passing in the host of the local blockchain.
const dharma = new Dharma("http://localhost:8545");

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAwaitingBlockchain: false
        };

        this.createDebtOrder = this.createDebtOrder.bind(this);
    }

    async createDebtOrder(formData) {
        this.setState({
            isAwaitingBlockchain: true
        });

        const { DebtOrder } = Dharma.Types;

        const { principal, collateral, expiration, termLength, interestRate } = formData;

        const accounts = await dharma.blockchain.getAccounts();

        if (!accounts) {
            console.error("No acccounts detected from web3 -- ensure a local blockchain is running.");

            this.setState({ isAwaitingBlockchain: false });

            return;
        }

        const debtorAddressString = accounts[0];

        const order = await DebtOrder.create(dharma, {
            principalAmount: principal,
            principalToken: "WETH",
            collateralAmount: collateral,
            collateralToken: "REP",
            interestRate: interestRate,
            termDuration: termLength,
            termUnit: "months",
            debtorAddress: debtorAddressString,
            expiresInDuration: expiration,
            expiresInUnit: "weeks"
        });

        console.log(order.serialize());

        this.setState({
            isAwaitingBlockchain: false
        });
    }

    render() {
        const { isAwaitingBlockchain } = this.state;

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Request a Loan on Dharma</h1>
                </header>

                <RequestLoanForm createDebtOrder={this.createDebtOrder} isAwaitingBlockchain={isAwaitingBlockchain} />
            </div>
        );
    }
}
