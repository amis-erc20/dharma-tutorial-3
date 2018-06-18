import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { OpenDebtOrder } from "./OpenDebtOrder";

import { RequestLoanForm } from "./form.js"

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

    render() {
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
