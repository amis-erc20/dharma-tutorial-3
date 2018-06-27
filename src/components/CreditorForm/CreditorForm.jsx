import React, { Component } from "react";

import { AllowPrincipalTransfer } from "./AllowPrincipalTransfer";
import { FillLoan } from "./FillLoan";

export class CreditorForm extends Component {
    render() {
        const { debtOrder } = this.props;

        return (
            <div>
                <AllowPrincipalTransfer debtOrder={debtOrder} />
                <FillLoan debtOrder={debtOrder} />
            </div>
        );
    }
}
