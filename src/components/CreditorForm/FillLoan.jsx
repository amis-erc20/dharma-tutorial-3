import React, { Component } from "react";

export class FillLoan extends Component {
    constructor(props) {
        super(props);

        this.handleFillLoan = this.handleFillLoan.bind(this);
    }

    async handleFillLoan(event) {
        event.preventDefault();

        const { debtOrder } = this.props;

        const creditorAddress = "0xd2f45e02ab7b190ac9a87b743eab4c8f2ed0e491";

        await debtOrder.fillAsCreditor(creditorAddress);
        console.log("loan filled");
    }

    render() {
        const { disabled } = this.props;

        return (
            <form className="request-form" onSubmit={this.handleFillLoan}>
                <div className="request-form-group">
                    <input
                        type="submit"
                        value="Fill"
                        className="request-form-submit"
                        disabled={disabled}
                    />
                </div>
            </form>
        );
    }
}
