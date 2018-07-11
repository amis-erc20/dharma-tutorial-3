import React, { Component } from "react";
import Create from "./Create";
import Fill from "./Fill";
import Repay from "./Repay";
import Collateral from "./Collateral";

import "./Tutorials.css";

export default class Tutorials extends Component {
    render() {
        const {
            // networking
            isAwaitingBlockchain,
            // create
            createLoanRequest,
            isCreated,
            // fill
            allowPrincipalTransfer,
            hasAllowedPrincipalTransfer,
            fillLoanRequest,
            isFilled,
            // repayment
            hasAllowedRepayments,
            allowRepayments,
            makeRepayment,
            isRepaid,
            // collateral
            returnCollateral,
            isCollateralReturnable,
        } = this.props;

        return (
            <div>
                    className="Tutorial"
                <Create
                    createLoanRequest={createLoanRequest}
                    isCreated={isCreated}
                    isAwaitingBlockchain={isAwaitingBlockchain}
                />
                <Fill
                    className="Tutorial"
                    allowPrincipalTransfer={allowPrincipalTransfer}
                    hasAllowedPrincipalTransfer={hasAllowedPrincipalTransfer}
                    fillLoanRequest={fillLoanRequest}
                    isFilled={isFilled}
                    isCreated={isCreated}
                    isAwaitingBlockchain={isAwaitingBlockchain}
                />
                <Repay
                    className="Tutorial"
                    makeRepayment={makeRepayment}
                    allowRepayments={allowRepayments}
                    hasAllowedRepayments={hasAllowedRepayments}
                    isFilled={isFilled}
                    isRepaid={isRepaid}
                    isAwaitingBlockchain={isAwaitingBlockchain}
                />
                <Collateral
                    className="Tutorial"
                    returnCollateral={returnCollateral}
                    isCollateralReturnable={isCollateralReturnable}
                    isAwaitingBlockchain={isAwaitingBlockchain}
                />
            </div>
        );
    }
}
