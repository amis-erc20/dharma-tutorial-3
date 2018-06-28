import React, { Component } from "react";

import "./LoanSummary.css";

export default class LoanSummary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFilled: false,
            isCreated: false,
            isExpired: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        const { debtOrder } = nextProps;

        if (!debtOrder) {
            return {};
        }

        this.getLoanSummary(debtOrder).then((data) => {
            this.setState(data);
        });
    }

    async getLoanSummary(debtOrder) {
        const isFilled = await debtOrder.isFilled();
        const isExpired = await debtOrder.isExpired();

        return { isFilled, isExpired, isCreated: true };
    }

    render() {
        const { isFilled, isExpired, isCreated } = this.state;

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
                            <i className={`summary-check fa fa-${isFilled ? successClass : dangerClass}`}/>
                        </td>
                    </tr>
                    <tr>
                        <th>Expired</th>
                        <td className="check-box-row">
                            <i className={`summary-check fa fa-${isExpired ? successClass : dangerClass}`}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
