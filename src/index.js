// External libraries
import React, { Component } from "react";
import ReactDOM from "react-dom";
// Require Web3 for interacting with the Ethereum blockchain.
import Web3 from "web3";
// Require the Dharma.js constructor.
import { Dharma, Types as DharmaTypes } from "@dharmaprotocol/dharma.js";
// Include basic style.
import "./index.css";

// Check if web3 was injected by a browser extension.
if (typeof window.web3 !== 'undefined') {
    window.web3 = new Web3(window.web3.currentProvider);
} else {
    console.log("error imminent");
    // Web3 was not injected by a browser extension.
    throw new Error("web3 not instantiated");
}

// Instantiate a new instance of Dharma, injecting the web3 provider.
const dharma = new Dharma(window.web3.currentProvider);

dharma.web3.version.getNetwork((err, networkId) => {
    if (parseInt(networkId, 10) === 1) {
        throw new Error("Cannot use on mainnet. Change to testnet or local");
    }
});

class App extends Component {
    async handleSaveForm() {
        const { TokenAmount, TimeInterval, EthereumAddress, InterestRate } = DharmaTypes;

        const accounts = await window.web3.eth.getAccounts();
        
        const debtorAddressString = accounts[0];

        const order = await DharmaTypes.DebtOrder.create(dharma, {
            principal: new TokenAmount(5, "WETH"),
            collateral: new TokenAmount(100, "REP"),
            debtorAddress: new EthereumAddress(debtorAddressString),
            interestRate: new InterestRate(5),
            termLength: new TimeInterval(2, "months"),
            expiresIn: new TimeInterval(1, "week")
        });

        console.log(order);
    }

    render() {
        this.handleSaveForm();

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
