import React, { Component } from "react";

import "./Balances.css";

export default class Balances extends Component {
    render() {
        const {
            debtorAMIS,
            debtorWETH,
            creditorAMIS,
            creditorWETH,
            collateralizerAMIS,
            collateralizerWETH
        } = this.props.balances;

        return (
            <div className="Balances">
                <h4>Balances</h4>

                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>WETH</th>
                            <th>AMIS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Borrower</th>
                            <td>{debtorWETH}</td>
                            <td>{debtorAMIS}</td>
                        </tr>
                        <tr>
                            <th>Lender</th>
                            <td>{creditorWETH}</td>
                            <td>{creditorAMIS}</td>
                        </tr>
                        <tr>
                            <th>Collateral Smart Contract</th>
                            <td>{collateralizerWETH}</td>
                            <td>{collateralizerAMIS}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
