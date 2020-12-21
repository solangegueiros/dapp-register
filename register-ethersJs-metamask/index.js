//Connect to the active web3 provider, per example, Metamask
provider = new ethers.providers.Web3Provider(web3.currentProvider);
signer = provider.getSigner(0);

// Variáveis preenchidas a partir da publicação do contrato
var contractAddress = '0xA6489eB7f0DaE73EC8F0Ee973a25192735a15104';
var abi = JSON.parse( '[{"constant":true,"inputs":[],"name":"getInfo","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_info","type":"string"}],"name":"setInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]' );

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



