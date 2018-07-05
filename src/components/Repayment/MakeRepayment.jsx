import React, { Component } from "react";

export class MakeRepayment extends Component {
    render() {
        const { disabled, handleMakeRepayment } = this.props;

        return (
            <form className="request-form" onSubmit={handleMakeRepayment}>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Make a Repayment"
                        className="btn btn-primary request-form-submit"
                        disabled={disabled}
                    />
                </div>
            </form>
        );
    }
}
