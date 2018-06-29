import React, { Component } from "react";
import Open from "./Open";
import Fill from "./Fill";

import "./Tutorials.css";

export default class Tutorials extends Component {
    render() {
        const { createDebtOrder, debtOrder, dharma, isAwaitingBlockchain, updateBlockchainStatus } = this.props;

        const disableOpenForm = isAwaitingBlockchain || debtOrder;

        return (
            <div>
                <Open
                    className="Tutorial"
                    disableForm={disableOpenForm}
                    dharma={dharma}
                    debtOrder={debtOrder}
                    createDebtOrder={createDebtOrder}
                />
                <Fill className="Tutorial" debtOrder={debtOrder} updateBlockchainStatus={updateBlockchainStatus} />
            </div>
        );
    }
}
