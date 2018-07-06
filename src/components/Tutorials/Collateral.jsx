import React, { Component } from "react";

import { Button } from "../Button/Button";

export default class Collateral extends Component {
    constructor(props) {
        super(props);

        this.handleReturnCollateral = this.handleReturnCollateral.bind(this);
    }

    async handleReturnCollateral(event) {
        event.preventDefault();

        const { debtOrder, updateBlockchainStatus } = this.props;

        await debtOrder.returnCollateral();

        await updateBlockchainStatus();
    }

    render() {
        const { isCollateralReturnable } = this.props;

        return (
            <div className="CollateralTutorial container Tutorial" id="fill-loan">
                <header className="App-header">
                    <h3 className="App-title">Return Collateral to the Lender</h3>
                </header>
                <Button
                    label={"Return Collateral"}
                    disabled={!isCollateralReturnable}
                    onClick={this.handleReturnCollateral}
                />
            </div>
        );
    }
}
