pragma solidity ^0.5.2;

contract Register {
    address public owner;
    string private info;

    constructor() public {
        owner = msg.sender;
    }

    event InfoSet(string _info);

    function setInfo(string memory _info) public {
        info = _info;
        emit InfoSet (_info);
    }

    function getInfo() public view returns (string memory) {
        return info;
    }
}