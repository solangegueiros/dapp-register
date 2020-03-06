import React, { Component } from "react";
import './App.css';
import { DrizzleContext } from "@drizzle/react-plugin";
import GetInfo from "./components/GetInfo";
import SetInfo from "./components/SetInfo";

class App extends Component {
  render() {
    return (
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;

          if (!initialized) {
            return "Loading...";
          }

          return (
            <div className="App">
              <h1>Register</h1>
              <h2>Using drizzle-react</h2>
              <p>
                Demo interact with a smart contract to call a view function (getInfo), which don't have gas costs <br/>
                and other function (setInfo) that alter state at Blockchain and it costs gas. <br/>
                It uses drizzle and drizzle-react to manage the web3 connection and smart contract interactions. 
              </p>
              <p>By Solange Gueiros</p>
              <GetInfo
                  drizzle={drizzle}
                  drizzleState={drizzleState}
              />
              <SetInfo
                  drizzle={drizzle}
                  drizzleState={drizzleState}
              />            
            </div>
          );
        }}
      </DrizzleContext.Consumer>
    );
  }
}

export default App;
