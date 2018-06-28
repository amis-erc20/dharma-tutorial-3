import React, { Component } from "react";
import Dharma from "@dharmaprotocol/dharma.js";

// Constants
import { creditorAddress, debtorAddress } from "../../constants";

// Tutorials
import Open from "../../tutorials/Open";
import Fill from "../../tutorials/Fill";

// BlockchainStatus
import Balances from "../Balances/Balances";
import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import LoanSummary from "../LoanSummary/LoanSummary";

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
        const repAddress = await dharma.contracts.getTokenAddressBySymbolAsync("REP");
        const wethAddress = await dharma.contracts.getTokenAddressBySymbolAsync("WETH");

        const debtorREP = await dharma.token.getBalanceAsync(repAddress, debtorAddress);
        const debtorWETH = await dharma.token.getBalanceAsync(wethAddress, debtorAddress);

        const creditorREP = await dharma.token.getBalanceAsync(repAddress, creditorAddress);
        const creditorWETH = await dharma.token.getBalanceAsync(wethAddress, creditorAddress);

        // const collateralizerREP = await dharma.token.getBalanceAsync(repAddress, collateralizerAddress);
        // const collateralizerWETH = await dharma.token.getBalanceAsync(wethAddress, collateralizerAddress);

        this.setState({
            balances: {
                debtorREP: debtorREP.toNumber(),
                debtorWETH: debtorWETH.toNumber(),
                creditorREP: creditorREP.toNumber(),
                creditorWETH: creditorWETH.toNumber(),
                collateralizerREP: 11,
                collateralizerWETH: 14
            }
        });
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
        } catch (e) {
            console.error(e);

            this.setState({
                isAwaitingBlockchain: false,
                debtOrder: null
            });
        }
    }

    render() {
        const { balances, debtOrder, isAwaitingBlockchain } = this.state;

        const disableOpenForm = isAwaitingBlockchain || debtOrder;

        return (
            <div className="App">
                <Header/>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-2">
                            <Nav/>
                        </div>

                        <div className="col-sm-7">
                            <Open
                                disableForm={disableOpenForm}
                                dharma={dharma}
                                debtOrder={debtOrder}
                                createDebtOrder={this.createDebtOrder}
                            />

                            <Fill debtOrder={debtOrder} updateBlockchainStatus={this.updateBlockchainStatus} />
                        </div>

                        <div className="col-sm-3">
                            <div className="Summary">
                                <LoanSummary debtOrder={debtOrder} />

                                <Balances balances={balances} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
