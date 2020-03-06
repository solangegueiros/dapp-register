var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545/'));
//var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// Código para interagir com o contrato
var accounts;
var account;

// Variáveis preenchidas a partir da publicação do contrato
var contractAddress = '0x47ae7e35ed0346d0d7ab0c4894e35acfcd724663';
var abi = JSON.parse( '[ { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": true, "inputs": [], "name": "getInfo", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "string", "name": "_info", "type": "string" } ], "name": "setInfo", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]' );


//baseContract = web3.eth.contract(abi);
//contract = baseContract.at(contractAddress);
contract = new web3.eth.Contract(abi, contractAddress);
console.log('Contract: ' + contract.address);

// Busca contas
web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
        alert("Ocorreu um erro ao buscar suas contas.");
        return;
    }

    if (accs.length == 0) {
        alert("Nenhuma conta encontrada! Verifique se o Ethereum client está configurado corretamente.");
        return;
    }

    accounts = accs;
    account = accounts[0];
    console.log('Account: ' + account);
    web3.eth.defaultAccount = account;
});

function newRegister() {
    info = $("#newInfo").val();
    //alert (info);
    contract.methods.setInfo (info).send( {from: account}).then( function(tx) { 
        console.log( "Transaction: ", tx ); 
    });
    $("#newInfo").val('');
}

function loadRegister() {
    contract.methods.getInfo().call().then( function( info ) { 
        console.log( "info: ", info ) 
        //alert (info);
        document.getElementById('lastInfo').innerHTML = info;
    });
    
}



