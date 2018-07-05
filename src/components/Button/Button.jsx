import React, { Component } from "react";

// TODO: refactor to remove the form tag
export class Button extends Component {
    render() {
        const { disabled, label, onClick } = this.props;

        return (
            <form className="request-form" onSubmit={onClick}>
                <div className="form-group">
                    <input
                        type="submit"
                        value={label}
                        className="btn btn-primary request-form-submit"
                        disabled={disabled}
                    />
                </div>
            </form>
        );
    }
}
