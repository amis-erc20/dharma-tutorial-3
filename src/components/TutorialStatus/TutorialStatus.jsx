import React, { Component } from "react";
import Balances from "../Balances/Balances";
import LoanSummary from "../LoanSummary/LoanSummary";
import RepaymentSummary from "../RepaymentSummary/RepaymentSummary";
import CollateralSummary from "../CollateralSummary/CollateralSummary"

import "./TutorialStatus.css";

export default class TutorialStatus extends Component {
    render() {
        const { debtOrder,
                balances,
                isDebtOrderFilled,
                // Collateral
                isCollateralWithdrawn,
                isCollateralSeizable,
                isCollateralReturnable,
                // Repayments
                totalAmount,
                amountRepaid,
                amountOutstanding,
                tokenSymbol,
        } = this.props;

        const isCreated = debtOrder ? true : false;

        return (
            <div className="TutorialStatus">
                <LoanSummary isDebtOrderFilled={isDebtOrderFilled} isCreated={isCreated} />
                <RepaymentSummary
                    totalAmount={totalAmount}
                    amountRepaid={amountRepaid}
                    amountOutstanding={amountOutstanding}
                    tokenSymbol={tokenSymbol}
                />
                <CollateralSummary
                    isCollateralWithdrawn={isCollateralWithdrawn}
                    isCollateralSeizable={isCollateralSeizable}
                    isCollateralReturnable={isCollateralReturnable}
                />
                <Balances balances={balances} />
            </div>
        );
    }
}
