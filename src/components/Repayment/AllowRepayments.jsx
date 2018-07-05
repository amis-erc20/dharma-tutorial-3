import React, { Component } from "react";

export class AllowRepayments extends Component {
    render() {
        const { disabled, handleAllowRepayments } = this.props;

        return (
            <form className="request-form" onSubmit={handleAllowRepayments}>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Allow Repayments"
                        className="btn btn-primary request-form-submit"
                        disabled={disabled}
                    />
                </div>
            </form>
        );
    }
}
