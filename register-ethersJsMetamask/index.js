//Connect to the active web3 provider, per example, Metamask
provider = new ethers.providers.Web3Provider(web3.currentProvider);
signer = provider.getSigner(0);

// Variáveis preenchidas a partir da publicação do contrato
var contractAddress = '0x5a9BC69AFeA7592C124c3d476B528d525C8EAA89';
var abi = JSON.parse( '[ { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "string", "name": "_info", "type": "string" } ], "name": "setInfo", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getInfo", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" } ]' );

contract = new ethers.Contract(contractAddress, abi, signer)

function newRegister() {
    info = $("#newInfo").val();
    contract.setInfo(info).then( function(tx) { 
        console.log( "Transaction: ", tx ); 
    });
    $("#newInfo").val('');
}

function loadRegister() {
    contract.getInfo().then( function( info ) {         
        console.log( "info: ", info) 
        document.getElementById('lastInfo').innerHTML = info;
    });
}



