import React, { Component } from "react";

import "./LoanSummary.css";

export default class LoanSummary extends Component {
    render() {
        const { isDebtOrderFilled, isCreated } = this.props;

        const successClass = "check text-success";
        const dangerClass = "times text-danger";

        return (
            <div>
                <h3>Loan Summary</h3>

                <table className="table table-bordered table-hover">
                    <tbody>
                    <tr>
                        <th>Created</th>
                        <td className="check-box-row">
                            <i className={`summary-check fa fa-${isCreated ? successClass : dangerClass }`}/>
                        </td>
                    </tr>
                    <tr>
                        <th>Filled</th>
                        <td className="check-box-row">
                            <i className={`summary-check fa fa-${isDebtOrderFilled ? successClass : dangerClass}`}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
