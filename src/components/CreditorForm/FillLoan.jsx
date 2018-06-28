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

        await debtOrder.fillAsCreditor(creditorAddress);
        await updateBlockchainStatus();
    }

    render() {
        const { disabled } = this.props;

        return (
            <form className="request-form" onSubmit={this.handleFillLoan}>
                <div className="request-form-group">
                    <input type="submit" value="Fill" className="request-form-submit" disabled={disabled} />
                </div>
            </form>
        );
    }
}
