//import Web3 from "web3";
import Register from "./contracts/Register.json";

const options = {
  /*
  web3: {
    block: false,
    customProvider: new Web3("ws://localhost:8545"),
  },
  */
  contracts: [Register]
};

export default options;
