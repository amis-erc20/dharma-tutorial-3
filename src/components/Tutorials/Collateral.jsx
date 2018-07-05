import React, { Component } from "react";

import { Button } from "../Button/Button";

export default class Collateral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collateralReturnable: false
        };

        this.handleReturnCollateral = this.handleReturnCollateral.bind(this);
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

        return { collateralReturnable };
    }

    async handleReturnCollateral(event) {
        event.preventDefault();

        const { debtOrder, updateBlockchainStatus } = this.props;

        await debtOrder.returnCollateral();

        await updateBlockchainStatus();
    }

    render() {
        const { collateralReturnable } = this.state;

        return (
            <div className="CollateralTutorial container Tutorial" id="fill-loan">
                <header className="App-header">
                    <h3 className="App-title">Return Collateral to the Lender</h3>
                </header>
                <Button
                    label={"Return Collateral"}
                    disabled={!collateralReturnable}
                    onClick={this.handleReturnCollateral}
                />
            </div>
        );
    }
}
