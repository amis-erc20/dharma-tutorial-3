import React, { Component } from "react";
import Balances from "../Balances/Balances";
import LoanSummary from "../LoanSummary/LoanSummary";
import RepaymentSummary from "../RepaymentSummary/RepaymentSummary";
import CollateralSummary from "../CollateralSummary/CollateralSummary"

import "./TutorialStatus.css";

export default class TutorialStatus extends Component {
    render() {
        const { debtOrder, balances, debtOrderFilled } = this.props;

        return (
            <div className="TutorialStatus">
                <LoanSummary debtOrder={debtOrder} />
                <RepaymentSummary debtOrder={debtOrder} debtOrderFilled={debtOrderFilled} />
                <CollateralSummary debtOrder={debtOrder} debtOrderFilled={debtOrderFilled} />
                <Balances balances={balances} />
            </div>
        );
    }
}
