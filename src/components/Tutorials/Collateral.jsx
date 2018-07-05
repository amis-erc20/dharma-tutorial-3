import React, { Component } from "react";

import { Button } from "../Button/Button";

export default class Collateral extends Component {
    constructor(props) {
        super(props);

        this.handleReturnCollateral = this.handleReturnCollateral.bind(this);
        this.handleSeizeCollateral = this.handleSeizeCollateral.bind(this);
    }

    async handleReturnCollateral(event) {
        event.preventDefault();

        const { debtOrder, updateBlockchainStatus } = this.props;

        await debtOrder.returnCollateral();

        await updateBlockchainStatus();
    }

    async handleSeizeCollateral(event) {
        event.preventDefault();

        const { debtOrder, updateBlockchainStatus } = this.props;

        await debtOrder.seizeCollateral();

        await updateBlockchainStatus();
    }

    render() {
        return (
            <div className="FillTutorial container Tutorial" id="fill-loan">
                <header className="App-header">
                    <h3 className="App-title">Return or Seize Collateral</h3>
                </header>
                <Button label={"Seize Collateral"} disabled={false} onClick={this.handleSeizeCollateral} />
                <Button label={"Return Collateral"} disabled={false} onClick={this.handleReturnCollateral} />
            </div>
        );
    }
}
