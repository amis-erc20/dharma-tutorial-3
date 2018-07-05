import React, { Component } from "react";

import "./RepaymentSummary.css";

export default class RepaymentSummary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            totalAmount: 0,
            amountRepaid: 0,
            amountOutstanding: 0,
            tokenSymbol: "",
        };
    }

    componentWillReceiveProps(nextProps) {
        const { debtOrder } = nextProps;

        if (!debtOrder) {
            return {};
        }

        this.getRepaymentSummary(debtOrder).then((data) => {
            this.setState(data);
        });
    }

    async getRepaymentSummary(debtOrder) {
        const totalAmount = await debtOrder.getTotalExpectedRepaymentAmount();
        const amountRepaid = await debtOrder.getRepaidAmount();
        const amountOutstanding = await debtOrder.getOutstandingAmount();
        const tokenSymbol = await debtOrder.getRepaymentTokenSymbol();

        return { totalAmount, amountRepaid, amountOutstanding, tokenSymbol };
    }

    render() {
        const { totalAmount, amountRepaid, amountOutstanding, tokenSymbol } = this.state;

        const successClass = "check text-success";
        const dangerClass = "times text-danger";

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
