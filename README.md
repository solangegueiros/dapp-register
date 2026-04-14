# Register dApp

[solange.dev](https://solange.dev/)

Would you like to know the upcoming events by Sol?

Follow on [Sol's twitter](https://twitter.com/solangegueiros) 

### Ethereum Sepolia Example

- [RegisterLog](https://eth-sepolia.blockscout.com/address/0x608059eA7E04d77F13442c63E60F749Cb49CA97F)
- [RegisterUsingCRE](https://eth-sepolia.blockscout.com/address/0xcBcE30f84bc90240443c87cDCa27EcC0e6CFE37E)

## Frontend - Features

Features
- Wallet connection with automatic Sepolia network switching
- Get Info button - reads the stored string from the contract (works without wallet, uses public RPC)
- Set Info button - writes a new string to the contract (requires wallet connection)
- Editable Register Address - click "Edit" next to the contract address to change it at runtime

## Local Run

1. Copy .env.example to .env and set your deployed contract address:

REGISTER_ADDRESS=0x...

2. First time - Install dependancies

```cmd
cd frontend
npm install
```

3. Run

On frontend folder

```cmd
cd frontend
```

```cmd
npm run dev
```

4. Open

[http://localhost:5173/](http://localhost:5173/)


## Production - Publish

On frontend folder

```cmd
cd frontend
```
Execute 

```cmd
npm run build
```

Use the folder **dist**
