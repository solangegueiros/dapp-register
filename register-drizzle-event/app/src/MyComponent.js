import React from "react";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  AccountData,
  ContractData,
  ContractForm,
} from "@drizzle/react-components";

export default () => (
  <div className="App">
    <ToastContainer />
    <div>
      <h1>Register</h1>
      <h2>Monitoring events using drizzle-react-components</h2>
      <p>
        Demo interact with a smart contract to call a view function (getInfo), which don't have gas costs <br/>
        and other function (setInfo) that alter state at Blockchain and it costs gas. <br/>
        It uses drizzle, drizzle-react and drizzle-react-components to manage the web3 connection and smart contract interactions. <br/>
        Also connect and react to Solidity Contract events by hooking into Drizzle Redux state, using React-Toastify.
      </p>
      <p>By Solange Gueiros</p> 
    </div>

    <div className="section">
      <h2>Active Account</h2>
      <AccountData accountIndex={0} units="ether" precision={4} />
    </div>

    <div className="section">
      <h2>Register</h2>
      <p>          
        <strong>Info: </strong>
        <ContractData contract="Register" method="getInfo" />
      </p>
      <ContractForm contract="Register" method="setInfo" />
    </div>

  </div>
);
