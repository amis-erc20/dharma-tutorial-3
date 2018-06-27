import React, { Component } from "react";

export class AllowPrincipalTransfer extends Component {
    constructor(props) {
        super(props);

        this.handleAllowPrincipalTransfer = this.handleAllowPrincipalTransfer.bind(this);
    }

    async handleAllowPrincipalTransfer(event) {
        event.preventDefault();

        const { debtOrder } = this.props;

        await debtOrder.allowPrincipalTransfer();
    }

    render() {
        const { debtOrder } = this.props;

        return (
            <form className="request-form" onSubmit={this.handleAllowPrincipalTransfer}>
                <div className="request-form-group">
                    <input
                        type="submit"
                        value="Allow Principal Transfer"
                        className="request-form-submit"
                        disabled={!debtOrder}
                    />
                </div>
            </form>
        );
    }
}
