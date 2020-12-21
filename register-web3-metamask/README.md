# Register dapp - web3 with Metamask

## 1. Deploy the smart contract

### Select your network in Metamask

For example, I will do it in Goerli.

> You must have enough funds to deploy the smart contract in the selected network in Metamask

### Using Remix, connected to Metamask

- open Remix using http (not https)
- copy the smart contract register into Remix
- Environment: `Web3 Injected`
- Deploy

For example, I published this on Goerli:

[0xA6489eB7f0DaE73EC8F0Ee973a25192735a15104](https://goerli.etherscan.io/tx/0x7fadf1f32a755106cfd44f1fbbce3ae7287e293633588209573079c380adfd3f)

## 2. Update contract address

At index.js, update var `contractAddress`

## 3. Run

```shell
npm install

node server.js
```

- go to [localhost:3300](http://localhost:3300/)

- authorize in Metamask

- refresh the web page in [localhost:3300](http://localhost:3300/)

