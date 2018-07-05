import React, { Component } from "react";
import Balances from "../Balances/Balances";
import LoanSummary from "../LoanSummary/LoanSummary";
import RepaymentSummary from "../RepaymentSummary/RepaymentSummary";

import "./TutorialStatus.css";

export default class TutorialStatus extends Component {
    render() {
        const { debtOrder, balances, isDebtOrderFilled } = this.props;

        return (
            <div className="TutorialStatus">
                <LoanSummary debtOrder={debtOrder} />
                <RepaymentSummary debtOrder={debtOrder} isDebtOrderFilled={isDebtOrderFilled} />
                <Balances balances={balances} />
            </div>
        );
    }
}
