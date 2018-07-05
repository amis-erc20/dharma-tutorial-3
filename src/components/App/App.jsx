import React, { Component } from "react";
import Dharma from "@dharmaprotocol/dharma.js";

// Constants
import { creditorAddress, debtorAddress } from "../../constants";

// BlockchainStatus
import Header from "../Header/Header";

import Tutorials from "../Tutorials/Tutorials";
import TutorialStatus from "../TutorialStatus/TutorialStatus";

// Instantiate a new instance of Dharma, passing in the host of the local blockchain.
const dharma = new Dharma("http://localhost:8545");

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAwaitingBlockchain: false,
            balances: {}
        };

        this.createDebtOrder = this.createDebtOrder.bind(this);
        this.updateBlockchainStatus = this.updateBlockchainStatus.bind(this);
    }

    async componentDidMount() {
        this.updateBlockchainStatus();
    }

    async updateBlockchainStatus() {
        const { debtOrder } = this.state;

        const repAddress = await dharma.contracts.getTokenAddressBySymbolAsync("REP");
        const wethAddress = await dharma.contracts.getTokenAddressBySymbolAsync("WETH");

        const debtorREP = await dharma.token.getBalanceAsync(repAddress, debtorAddress);
        const debtorWETH = await dharma.token.getBalanceAsync(wethAddress, debtorAddress);

        const creditorREP = await dharma.token.getBalanceAsync(repAddress, creditorAddress);
        const creditorWETH = await dharma.token.getBalanceAsync(wethAddress, creditorAddress);

        const collateralizerREP = debtOrder ? await debtOrder.getCurrentCollateralAmount() : 0;
        // WETH never gets collateralized in this example.
        const collateralizerWETH = 0;

        const debtOrderFilled = debtOrder ? await debtOrder.isFilled() : false;

        this.setState({
            balances: {
                debtorREP: debtorREP
                    .div(10 ** 18)
                    .toNumber()
                    .toLocaleString(),
                debtorWETH: debtorWETH
                    .div(10 ** 18)
                    .toNumber()
                    .toLocaleString(),
                creditorREP: creditorREP
                    .div(10 ** 18)
                    .toNumber()
                    .toLocaleString(),
                creditorWETH: creditorWETH
                    .div(10 ** 18)
                    .toNumber()
                    .toLocaleString(),
                collateralizerREP,
                collateralizerWETH
            },
            debtOrderFilled
        });
    }

    async createDebtOrder(formData) {
        this.setState({
            isAwaitingBlockchain: true
        });

        const { DebtOrder } = Dharma.Types;

        const { principal, collateral, termLength, interestRate } = formData;

        try {
            const debtOrder = await DebtOrder.create(dharma, {
                principalAmount: principal,
                principalToken: "WETH",
                collateralAmount: collateral,
                collateralToken: "REP",
                interestRate: interestRate,
                termDuration: termLength,
                termUnit: "months",
                debtorAddress: debtorAddress,
                expiresInDuration: 1,
                expiresInUnit: "weeks"
            });

            await debtOrder.allowCollateralTransfer(debtorAddress);

            this.setState({
                isAwaitingBlockchain: false,
                debtOrder
            });
        } catch (e) {
            console.error(e);

            this.setState({
                isAwaitingBlockchain: false,
                debtOrder: null
            });
        }
    }

    render() {
        const { balances, debtOrder, debtOrderFilled, isAwaitingBlockchain } = this.state;

        return (
            <div className="App">
                <Header />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-7">
                            <Tutorials
                                createDebtOrder={this.createDebtOrder}
                                debtOrder={debtOrder}
                                debtOrderFilled={debtOrderFilled}
                                dharma={dharma}
                                isAwaitingBlockchain={isAwaitingBlockchain}
                                updateBlockchainStatus={this.updateBlockchainStatus}
                            />
                        </div>

                        <div className="col-sm-5">
                            <TutorialStatus
                                balances={balances}
                                debtOrder={debtOrder}
                                debtOrderFilled={debtOrderFilled}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
