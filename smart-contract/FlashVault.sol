// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FlashVault {
    address public owner;
    uint public vaultBalance;

    event Deposited(address indexed user, uint amount);
    event FlashLoanExecuted(address indexed executor, uint amount);

    constructor() {
        owner = msg.sender;
    }

    function deposit() external payable {
        require(msg.value > 0, "Deposit must be positive");
        vaultBalance += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    function executeFlashLoan() external {
        require(vaultBalance > 0, "Empty vault");
        emit FlashLoanExecuted(msg.sender, vaultBalance);
    }

    function getBalance() external view returns (uint) {
        return address(this).balance;
    }
}
