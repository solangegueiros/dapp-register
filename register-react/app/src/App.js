import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Register from "./contracts/Register.json";

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      info: ''
    }
  }

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
    console.log (window.web3.currentProvider)
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    console.log ('account: ', accounts[0])
    this.setState({ account: accounts[0] })
  
    //Verifica qual rede está ativa no web3    
    const networkId = await web3.eth.net.getId()
    console.log ('networkId: ', networkId)
    //Verifica se o smart contract foi publicado nessa rede
    const networkData = Register.networks[networkId]
    console.log ('networkData: ', networkData)
    if(networkData) {
      const abi = Register.abi
      const address = networkData.address
      console.log ('contract address: ', address)
      const contract = new web3.eth.Contract(abi, address)
      console.log ('contract: ', contract)
      this.setState({ contract })
      const info = await contract.methods.getInfo().call()
      console.log ('info: ', info)
      this.setState({ info })
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  setInfo = (newInfo) => {
    console.log ('newInfo: ', newInfo)
    this.state.contract.methods.setInfo(newInfo).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      console.log ('transaction receipt: ', receipt)
      this.setState({ info: newInfo })
    })
  }  

  render() {
    return (
      <div>
        <div className="row text-center">
          <h1>Register using React</h1>
          <p> Informação: { this.state.info } </p>
          <hr/>            
          <br/>
        </div>
        <div className="row">
          <form onSubmit={(event) => {
            event.preventDefault()
            //const newInfo = this.newInfo.value
            const newInfo = this.input.value
            this.setInfo(newInfo)
          }}>
            <input
              type='text'
              className='form-control mb-1'
              ref={(input) => { this.input = input }}
            />
            <input
              type='submit'
              className='btn btn-block btn-primary'
              value='Set'
            />            
          </form>
        </div>
      </div>
      );
    }        
}

export default App;
