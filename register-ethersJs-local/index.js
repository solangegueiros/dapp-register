//import { ethers } from 'https://cors-anywhere.herokuapp.com/https://cdn.ethers.io/lib/ethers-5.0.esm.min.js';

let urlProvider = "http://localhost:8545";
const provider = new ethers.providers.JsonRpcProvider(urlProvider);
signer = provider.getSigner(0);

// Variáveis preenchidas a partir da publicação do contrato
var contractAddress = '0x5a9BC69AFeA7592C124c3d476B528d525C8EAA89';
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



