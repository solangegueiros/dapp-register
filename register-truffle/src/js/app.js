App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Register.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var Artifact = data;
      App.contracts.Register = TruffleContract(Artifact);
    
      // Set the provider for our contract
      App.contracts.Register.setProvider(App.web3Provider);
    
      return App.getInfo();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-get', App.getInfo);
    $(document).on('click', '.btn-set', App.setInfo);
  },

  getInfo: function() {
    var registerInstance;
    App.contracts.Register.deployed().then(function(instance) {
      registerInstance = instance;

      return registerInstance.getInfo.call();
    }).then(function(info) {
      console.log( "getInfo: ", info ) 
      document.getElementById('lastInfo').innerHTML = info;
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  setInfo: function(event) {
    event.preventDefault();

    var info = $("#newInfo").val();

    var registerInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      App.contracts.Register.deployed().then(function(instance) {
        registerInstance = instance;

        console.log( "setInfo: ", info ) 

        return registerInstance.setInfo(info, {from: account});
      }).then(function(tx) {
        console.log( "Transaction: ", tx ); 
        $("#newInfo").val('');
      });

    });
  },

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
