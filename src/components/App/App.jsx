import React, { Component } from "react";
import Dharma from "@dharmaprotocol/dharma.js";

// Tutorials
import Open from "../../tutorials/Open";
import Fill from "../../tutorials/Fill";

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

        try {
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

            await order.allowCollateralTransfer();

            this.setState({
                isAwaitingBlockchain: false,
                debtOrder: order
            });
        } catch(e) {
            console.error(e);

            this.setState({
                isAwaitingBlockchain: false,
                debtOrder: null,
            });
        }
    }

    render() {
        const { debtOrder, isAwaitingBlockchain } = this.state;

        const disableOpenForm = isAwaitingBlockchain || debtOrder;

        return (
            <div className="App">
                <Open disableForm={disableOpenForm} dharma={dharma} debtOrder={debtOrder} createDebtOrder={this.createDebtOrder}/>

                <Fill debtOrder={debtOrder} />
            </div>
        );
    }
}
