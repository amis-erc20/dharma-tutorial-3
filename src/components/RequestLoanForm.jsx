import React, {Component} from "react";

export class RequestLoanForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
          principal: 0,
          collateral: 0,
          expiration: 0,
          termLength: 0,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.createDebtOrder(this.state);
    }

    render() {
        const { isAwaitingBlockchain } = this.props;
        const { principal, collateral, expiration, termLength } = this.state;

        return (
            <form className="request-form"
                  onSubmit={this.handleSubmit}>
                <div className="request-form-group">
                    <label className="request-form-label">Principal Amount</label>
                    <input className="request-form-input"
                           name="principal"
                           type="number"
                           value={principal}
                           onChange={this.handleInputChange}
                           disabled={isAwaitingBlockchain} />

                </div>

                <div className="request-form-group">
                    <label className="request-form-label">Collateral Amount</label>
                    <input className="request-form-input"
                           name="collateral"
                           type="number"
                           value={collateral}
                           onChange={this.handleInputChange}
                           disabled={isAwaitingBlockchain} />

                </div>

                <div className="request-form-group">
                    <label className="request-form-label">Expiration</label>
                    <input className="request-form-input"
                           name="expiration"
                           type="number"
                           value={expiration}
                           onChange={this.handleInputChange}
                           disabled={isAwaitingBlockchain} />
                </div>

                <div className="request-form-group">
                    <label className="request-form-label">Term Length</label>
                    <input className="request-form-input"
                           name="termLength"
                           type="number"
                           value={termLength}
                           onChange={this.handleInputChange}
                           disabled={isAwaitingBlockchain} />
                </div>

                <div className="request-form-group">
                    <input type="submit"
                           value="Submit"
                           className="request-form-button"
                           disabled={isAwaitingBlockchain} />
                </div>
            </form>
        );
    }
}
