# Register dapp - web3 directly


## 1. Deploy the smart contract to a local node

### Using Remix

Run geth allowing connection form Remix

```shell
geth --datadir "data-private" --rpc --rpccorsdomain "*" --allow-insecure-unlock
```

- open Remix using http (not https)
- copy the smart contract register into Remix
- Environment: `Web3 Provider`
- Deploy


### Using Geth attach

- unlockAccount:
personal.unlockAccount(eth.accounts[0], "mypassword", 0)

- miner:
miner.start(1)

```shell
loadScript("./register.js");
```

## 2. Update contract address

At index.js, update var `contractAddress`

## 3. Run

```shell
npm install

node server.js
```

go to [localhost:3300](http://localhost:3300/)

