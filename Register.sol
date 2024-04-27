// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
 
contract Register {
    string private storedInfo;

    function getInfo() external view returns (string memory) {
        return storedInfo;
    }

    function setInfo(string memory myInfo) external {
        storedInfo = myInfo;
    }
}