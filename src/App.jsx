// External libraries
import React, { Component } from "react";
import ReactDOM from "react-dom";
// Require Web3 for interacting with the Ethereum blockchain.
import Web3 from "web3";
// Require the Dharma.js constructor.
import { Dharma, Types as DharmaTypes } from "@dharmaprotocol/dharma.js";
// Include basic style.
import "./App.css";
import { OpenDebtOrder } from "./OpenDebtOrder";

import { RequestLoanForm } from "./RequestLoanForm";

// Instantiate web3 by connecting it to a local blockchain.
const web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

// Instantiate a new instance of Dharma, injecting the web3 provider.
const dharma = new Dharma(web3.currentProvider);

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            debtOrder: null,
            isAwaitingBlockchain: false
        };

        this.handleSaveForm = this.handleSaveForm.bind(this);
    }

    async handleSaveForm(formData) {
        this.setState({
            isAwaitingBlockchain: true
        });

        const { TokenAmount, TimeInterval, EthereumAddress, InterestRate } = DharmaTypes;

        const { principal, collateral, expiration, termLength } = formData;

        const accounts = await new Promise(resolve => {
            web3.eth.getAccounts((err, result) => resolve(result));
        });

        const debtorAddressString = accounts[0];

        const order = await DharmaTypes.DebtOrder.create(dharma, {
            principal: new TokenAmount(principal, "WETH"),
            collateral: new TokenAmount(collateral, "REP"),
            debtorAddress: new EthereumAddress(debtorAddressString),
            interestRate: new InterestRate(5),
            termLength: new TimeInterval(termLength, "months"),
            expiresIn: new TimeInterval(expiration, "week")
        });

        this.setState({
            debtOrder: order.serialize(),
            isAwaitingBlockchain: false
        });
    }

    render() {
        const { debtOrder, isAwaitingBlockchain } = this.state;

        let debtOrderContent = null;

        if (isAwaitingBlockchain) {
            debtOrderContent = <h2>Creating a new debt order...</h2>;
        } else if (debtOrder) {
            debtOrderContent = <OpenDebtOrder debtOrder={debtOrder} />;
        }

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Request a Loan on Dharma</h1>
                </header>
                <RequestLoanForm handleSaveForm={this.handleSaveForm} />
                {debtOrderContent}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
