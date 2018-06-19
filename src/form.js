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
        this.props.handleSaveForm(this.state);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="request-form">
                <div className="request-form-group">
                    <label className="request-form-label">Principal Amount</label>
                    <input className="request-form-input"
                           name="principal"
                           type="number"
                           value={this.state.principal}
                           onChange={this.handleInputChange}/>

                </div>

                <div className="request-form-group">
                    <label className="request-form-label">Collateral Amount</label>
                    <input className="request-form-input"
                           name="collateral"
                           type="number"
                           value={this.state.collateral}
                           onChange={this.handleInputChange}/>

                </div>

                <div className="request-form-group">
                    <label className="request-form-label">Expiration</label>
                    <input className="request-form-input"
                           name="expiration"
                           type="number"
                           value={this.state.expiration}
                           onChange={this.handleInputChange}/>
                </div>

                <div className="request-form-group">
                    <label className="request-form-label">Term Length</label>
                    <input className="request-form-input"
                           name="termLength"
                           type="number"
                           value={this.state.termLength}
                           onChange={this.handleInputChange}/>
                </div>

                <div className="request-form-group">
                    <input type="submit" value="Submit" className="request-form-button"/>
                </div>
            </form>
        );
    }
}
