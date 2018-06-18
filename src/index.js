// External libraries
import React, { Component } from "react";
import ReactDOM from "react-dom";
// Require Web3 for interacting with the Ethereum blockchain.
import Web3 from "web3";
// Require the Dharma.js constructor.
import { Dharma, Types as DharmaTypes } from "@dharmaprotocol/dharma.js";
// Include basic style.
import "./index.css";
import { OpenDebtOrder } from "./OpenDebtOrder";

import { RequestLoanForm } from "./form.js"

// Instantiate web3 by connecting it to a local blockchain.
const web3 = new Web3(Web3.providers.HttpProvider("https://localhost:8545"));

// Instantiate a new instance of Dharma, injecting the web3 provider.
const dharma = new Dharma(web3.currentProvider);

// Prevent this dapp from being used on mainnet, since it's just a tutorial.
dharma.web3.version.getNetwork((err, networkId) => {
    if (parseInt(networkId, 10) === 1) {
        throw new Error("Cannot use on mainnet. Change to testnet or local");
    }
});

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            debtOrderOpened: false,
            debtOrder: {
                principal: "100 WETH",
                collateral: "50,000 DAI"
            },
            openingDebtOrder: false
        };
    }

    async handleSaveForm() {
        const { TokenAmount, TimeInterval, EthereumAddress, InterestRate } = DharmaTypes;

        const debtorAddressString = window.web3.eth.defaultAccount;

        console.log((await dharma.web3.eth.getAccounts).then((resp) => {
            console.log(resp);
        }));

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
        setTimeout(() => {
            this.handleSaveForm();
        }, 5000);

        const { debtOrder, debtOrderOpened, openingDebtOrder } = this.state;

        let debtOrderContent = null;

        if (openingDebtOrder) {
            debtOrderContent = <h2>Opening the debt order...</h2>;
        } else if (debtOrderOpened) {
            debtOrderContent = <OpenDebtOrder debtOrder={debtOrder} />;
        }

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Request a Loan on Dharma</h1>
                </header>
                <RequestLoanForm />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
