// Source code to interact with smart contract
// Código para interagir com o contrato

//connection with local node
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545/'));
//var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// contractAddress and abi are setted after contract deploy
// Variáveis preenchidas a partir da publicação do contrato
//var contractAddress = '0xebc9e7f09859df585734e106fc9c06fa35793ba0';
var contractAddress = '0x47ae7e35ed0346d0d7ab0c4894e35acfcd724663';
var abi = JSON.parse( '[{"constant":true,"inputs":[],"name":"getInfo","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_info","type":"string"}],"name":"setInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]' );

//baseContract = web3.eth.contract(abi);
//contract = baseContract.at(contractAddress);
contract = new web3.eth.Contract(abi, contractAddress);
console.log('Contract: ' + contract.address);

// Accounts
var account;

web3.eth.getAccounts( function(err, accounts) {
    if (err != null) {
        //alert("Ocorreu um erro ao buscar suas contas.");
        alert("Error retrieving accounts.");
        return;
    }

    if (accs.length == 0) {
        //alert("Nenhuma conta encontrada! Verifique se o Ethereum client está configurado corretamente.");
        alert("No account found! Make sure the Ethereum client is configured properly.");
        return;
    }
    account = accounts[0];
    console.log('Account: ' + account);
    web3.eth.defaultAccount = account;
});

//Smart contract functions
function registerSetInfo() {
    info = $("#newInfo").val();
    //alert (info);
    contract.methods.setInfo (info).send( {from: account}).then( function(tx) { 
        console.log( "Transaction: ", tx ); 
    });
    $("#newInfo").val('');
}

function registerGetInfo() {
    contract.methods.getInfo().call().then( function( info ) { 
        console.log( "info: ", info ) 
        //alert (info);
        document.getElementById('lastInfo').innerHTML = info;
    });
    
}
