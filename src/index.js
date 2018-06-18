import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { RequestLoanForm } from "./form.js"

class App extends Component {
    render() {
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
