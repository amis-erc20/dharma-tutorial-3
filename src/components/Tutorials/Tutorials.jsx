import React, { Component } from "react";
import Open from "./Open";
import Fill from "./Fill";
import Repay from "./Repay";
import Collateral from "./Collateral";

import "./Tutorials.css";

export default class Tutorials extends Component {
    render() {
        const {
            createDebtOrder,
            debtOrder,
            dharma,
            isAwaitingBlockchain,
            isCollateralReturnable,
            isDebtOrderFilled,
            isDebtOrderRepaid,
            updateBlockchainStatus
        } = this.props;

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
                <Fill
                    className="Tutorial"
                    debtOrder={debtOrder}
                    updateBlockchainStatus={updateBlockchainStatus}
                    isDebtOrderFilled={isDebtOrderFilled}
                />
                <Repay
                    className="Tutorial"
                    debtOrder={debtOrder}
                    updateBlockchainStatus={updateBlockchainStatus}
                    isDebtOrderFilled={isDebtOrderFilled}
                    isDebtOrderRepaid={isDebtOrderRepaid}
                />
                <Collateral
                    className="Tutorial"
                    debtOrder={debtOrder}
                    isCollateralReturnable={isCollateralReturnable}
                    updateBlockchainStatus={updateBlockchainStatus}
                />
            </div>
        );
    }
}
