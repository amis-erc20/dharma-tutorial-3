import React, { Component } from "react";

import { Button } from "../Button/Button";

export default class Collateral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collateralReturnable: false,
            collateralSeizable: false
        };

        this.handleReturnCollateral = this.handleReturnCollateral.bind(this);
        this.handleSeizeCollateral = this.handleSeizeCollateral.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { debtOrder } = nextProps;

        if (!debtOrder) {
            return {};
        }

        this.getLoanSummary(debtOrder).then(data => {
            this.setState(data);
        });
    }

    async getLoanSummary(debtOrder) {
        const collateralReturnable = await debtOrder.isCollateralReturnable();
        const collateralSeizable = await debtOrder.isCollateralSeizable();

        return { collateralReturnable, collateralSeizable };
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
        const { collateralReturnable, collateralSeizable } = this.state;

        return (
            <div className="CollateralTutorial container Tutorial" id="fill-loan">
                <header className="App-header">
                    <h3 className="App-title">Return or Seize Collateral</h3>
                </header>
                <Button
                    label={"Return Collateral"}
                    disabled={!collateralReturnable}
                    onClick={this.handleReturnCollateral}
                />
                <Button
                    label={"Seize Collateral"}
                    disabled={!collateralSeizable}
                    onClick={this.handleSeizeCollateral}
                />
            </div>
        );
    }
}
