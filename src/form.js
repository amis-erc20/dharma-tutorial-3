import { Component } from "react";

class RequestLoanForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
          principal: undefined,
          collateral: undefined,
          expiration: undefined,
          termLength: undefined,
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
      console.log(this.state);
      event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Principal Amount:
          <input name="principal" type="number" value={this.state.principal} onChange={this.handleInputChange} />
        </label>

        <label>
          Collateral Amount:
          <input name="collateral" type="number" value={this.state.collateral} onChange={this.handleInputChange} />
        </label>

        <label>
          Expiration:
          <input name="expiration" type="number" value={this.state.expiration} onChange={this.handleInputChange} />
        </label>

        <label>
          Term Length:
          <input name="termLength" type="number" value={this.state.termLength} onChange={this.handleInputChange} />
        </label>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
