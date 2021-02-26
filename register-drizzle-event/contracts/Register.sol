pragma solidity 0.5.4;

contract Register {
    string private info;

    event InfoSet(string _info);

    function setInfo(string memory _info) public {
        info = _info;
        emit InfoSet (_info);
    }

    function getInfo() public view returns (string memory) {
        return info;
    }
}