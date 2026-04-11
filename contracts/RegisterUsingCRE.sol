// SPDX-License-Identifier: MIT
pragma solidity 0.8.34;

import {ReceiverTemplate} from "./ReceiverTemplate.sol";

interface RegisterInterface {
    function getInfo() external returns (string memory);
    function setInfo(string memory myInfo) external;
}

contract RegisterUsingCRE is ReceiverTemplate {
    RegisterInterface public register;

    // Ethereum Sepolia Testnet
    address forwarderAddress = 0x15fC6ae953E024d975e77382eEeC56A9101f9F88;

    /// Constructor sets the Chainlink Forwarder address for security
    /// forwarderAddress The address of the Chainlink KeystoneForwarder contract
    /// @dev For Sepolia testnet, use: 0x15fC6ae953E024d975e77382eEeC56A9101f9F88
    constructor(address registerAddress) ReceiverTemplate(forwarderAddress) {
        register = RegisterInterface(registerAddress);
    }

    function registerSet(string memory myInfo) public {
        register.setInfo(myInfo);
    }

    /// From CRE ReceiverTemplate
    function _processReport(bytes calldata report) internal override {
        string memory myInfo = abi.decode(report, (string));
        registerSet(myInfo);
    }
}
