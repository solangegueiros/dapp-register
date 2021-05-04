var contract, account;

export async function Init() {
    if (typeof window.ethereum !== 'undefined') {
    
        var web3 = new Web3(window.ethereum);
        console.log('' + web3);

        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
        } catch (error) {
            console.log(error);
            return;
        }
    
        var abi = [
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_info",
                        "type": "string"
                    }
                ],
                "name": "setInfo",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getInfo",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ];

        //var contractAddress = '0x7E06F12296A9975d7BADB25414766228522e34aE';
        var contractAddress = '0x333bA7e33e2f0dED1AA2C3E8e0ed6873817003F0'; //RSK testnet 
        contract = new web3.eth.Contract(abi, contractAddress);
        console.log('Contract: ' + contract._address);

        web3.eth.getAccounts( function(err, accounts) {
            if (err != null) {
                alert("There was an error fetching your accounts.");
                return;
            }
        
            if (accounts.length == 0) {
                alert("No account found! Check that the Ethereum client is configured correctly.");

                return;
            }
    
            account = accounts[0];
            console.log('Conta: ' + account);
            web3.eth.defaultAccount = account;
        });
    
    } else {
        alert('Must install MetaMask.');
    }
}

export async function RegisterSetInfo(info, dotNetReference) {

    if (!contract || !account) {
        alert('Contract not created.');
        dotNetReference.invokeMethodAsync('RegisterSetInfoCallback', false);
        return;
    }

    contract.methods.setInfo(info).send({from: account}).then(function(tx) { 
        console.log('Transaction: ', tx); 
        dotNetReference.invokeMethodAsync('RegisterSetInfoCallback', true);
    }).catch(function(error) {
        console.log(error);
        dotNetReference.invokeMethodAsync('RegisterSetInfoCallback', false);
    });
}

export async function RegisterGetInfo(dotNetReference) {

    if (! contract) {
        alert('Contract not created.');
        dotNetReference.invokeMethodAsync('RegisterGetInfoCallback', '');
        return;
    }

    contract.methods.getInfo().call().then( function(info) { 
        console.log('The info is: ' + info)
        dotNetReference.invokeMethodAsync('RegisterGetInfoCallback', info);
    }).catch(function(error) {
        console.log(error);
        dotNetReference.invokeMethodAsync('RegisterGetInfoCallback', '');
    });
}