import React, { Component } from "react";

export class AllowPrincipalTransfer extends Component {
    render() {
        const { disabled, handleAllowPrincipalTransfer } = this.props;

        return (
            <form className="request-form" onSubmit={handleAllowPrincipalTransfer}>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Allow Principal Transfer"
                        className="btn btn-primary request-form-submit"
                        disabled={disabled}
                    />
                </div>
            </form>
        );
    }
}
