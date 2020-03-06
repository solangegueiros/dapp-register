import React, { Component } from "react";
import './App.css';
import GetInfo from "./components/GetInfo";
import SetInfo from "./components/SetInfo";

class App extends Component {
  state = { loading: true, drizzleState: null };

  componentDidMount() {
    const { drizzle } = this.props;

    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {

      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.loading) return "Loading Drizzle...";
    return (
      <div className="App">
        <h1>Register</h1>
        <h2>Using drizzle</h2>
        <p>
          Demo interact with a smart contract to call a view function (getInfo), which don't have gas costs <br/>
          and other function (setInfo) that alter state at Blockchain and it costs gas. <br/>
          It uses drizzle and drizzle-react to manage the web3 and smart contract connections. 
        </p>
        <p>By Solange Gueiros</p>
        <GetInfo
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
        <SetInfo
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />        
      </div>
    );
  }
}

export default App;