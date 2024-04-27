# Register dapp - ethers.js

## Deploy smart contract locally

For example, using ganache-cli

#### Install ganache-cli

```shell
npm i -g ganache-cli
```

```shell
ganache-cli -i 10101
```

Or, to use your own mnemonic:

```shell
ganache-cli -i 10101 -m "your mnemonic"
```

For example:

```shell
ganache-cli -i 10101 -m "virtual valve razor retreat either turn possible student grief engage attract fiber"
```

* -i is the networkID, so I am defining the network ID 10101

## update contractAddress
At index.js, update var contractAddress

## Run the server

```shell
npm install

node server.js
```

> Note:
> Using ethers.js from cdn: https://cdn.ethers.io/scripts/ethers-v4.min.js
