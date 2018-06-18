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

        this.handleChange = this.handleChange.bind(this);
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
          <input name="principal" type="number" value={this.state.principal} onChange={this.handleChange} />
        </label>


        <input type="submit" value="Submit" />
      </form>
    );
  }
}
