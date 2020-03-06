import React from "react";

class GetInfo extends React.Component {
  state = { dataKey: null };

  async componentDidMount() {
    const { drizzle, drizzleState } = this.props;

    await window.ethereum.enable();

    console.log(drizzle);
    console.log(drizzleState);

    const contract = drizzle.contracts.Register;
    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods["getInfo"].cacheCall();
    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });    
  }

  render() {
    // get the contract state from drizzleState
    const { Register } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    const info = Register.getInfo[this.state.dataKey];

    // if it exists, then we display its value
    return (
      <div>
        <h2>GetInfo Component</h2>
        <p>Info: {info && info.value}</p>
      </div>
    );
  }
}

export default GetInfo;
