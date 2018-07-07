import React, { Component } from "react";

export default class RepaymentSummary extends Component {
    render() {
        const { totalAmount, amountRepaid, amountOutstanding, tokenSymbol } = this.props;

        return (
            <div>
                <h3>Repayment Summary</h3>

                <table className="table table-bordered table-hover">
                    <tbody>
                    <tr>
                        <th>Total</th>
                        <td className="check-box-row">
                            {`${totalAmount} ${tokenSymbol}`}
                        </td>
                    </tr>
                    <tr>
                        <th>Repaid</th>
                        <td className="check-box-row">
                            {`${amountRepaid} ${tokenSymbol}`}
                        </td>
                    </tr>
                    <tr>
                        <th>Outstanding</th>
                        <td className="check-box-row">
                            {`${amountOutstanding} ${tokenSymbol}`}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
