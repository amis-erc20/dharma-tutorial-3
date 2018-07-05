import React, { Component } from "react";

export class FillLoan extends Component {
    render() {
        const { disabled, handleFillLoan } = this.props;

        return (
            <form className="request-form" onSubmit={handleFillLoan}>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Fill"
                        className="btn btn-primary request-form-submit"
                        disabled={disabled}
                    />
                </div>
            </form>
        );
    }
}
