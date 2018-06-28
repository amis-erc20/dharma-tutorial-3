import React, { Component } from "react";

export default class BlockchainStatus extends Component {
    render() {
        const {
            debtorREP,
            debtorWETH,
            creditorREP,
            creditorWETH,
            collateralizerREP,
            collateralizerWETH
        } = this.props.blockchainStatus;

        return (
            <table>
                <thead>
                    <tr>
                        <th>Account Holder</th>
                        <th>WETH</th>
                        <th>REP</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Debtor</td>
                        <td>{debtorWETH}</td>
                        <td>{debtorREP}</td>
                    </tr>
                    <tr>
                        <td>Creditor</td>
                        <td>{creditorWETH}</td>
                        <td>{creditorREP}</td>
                    </tr>
                    <tr>
                        <td>Collateralizer Contract</td>
                        <td>{collateralizerWETH}</td>
                        <td>{collateralizerREP}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
