import React, { Component } from "react";

import { creditorAddress } from "../../constants";

export class FillLoan extends Component {
    constructor(props) {
        super(props);

        this.handleFillLoan = this.handleFillLoan.bind(this);
    }

    async handleFillLoan(event) {
        event.preventDefault();

        const { debtOrder, updateBlockchainStatus } = this.props;

        /*
         * Step 5:
         * With the principal and collateral permissions enabled, the last step
         * is to actually call fill on the loan order:
         */

        // your code here

        await updateBlockchainStatus();
    }

    render() {
        const { disabled } = this.props;

        return (
            <form className="request-form" onSubmit={this.handleFillLoan}>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Fill"
                        className="btn btn-primary request-form-submit"
                        disabled={disabled}
                    />
                </div>
            </form>
        );
    }
}
