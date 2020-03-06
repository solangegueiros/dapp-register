import React from "react";

class SetInfo extends React.Component {
  state = { stackId: null, inputValue: "" };

  handleInputChange = e => this.setState({ inputValue: e.target.value });

  setValue = value => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Register;

    // let drizzle know we want to call the `set` method with `value`
    const stackId = contract.methods["setInfo"].cacheSend(this.state.inputValue, {
      from: drizzleState.accounts[0]
    });

    // save the `stackId` for later reference
    this.setState({ stackId });
  };

  getTxStatus = () => {
    const { stackId } = this.state;
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = this.props.drizzleState;

    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[stackId];

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    //console.log(txHash);
    //console.log(transactions[txHash]);
    if (transactions[txHash] != null) 
      if (transactions[txHash].receipt != null) 
        console.log('receipt \n', transactions[txHash].receipt);

    // otherwise, return the transaction status
    return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
  };

  render() {
    return (
      <div>
        <h2>SetInfo Component</h2>
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
        />
        <button onClick={this.setValue}>Set Info</button>
        <div>{this.getTxStatus()}</div>
      </div>
    );
  }
}

export default SetInfo;