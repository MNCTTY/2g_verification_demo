/*global ethereum, MetamaskOnboarding */

/*
The `piggybankContract` is compiled from:

  pragma solidity ^0.4.0;
  contract PiggyBank {

      uint private balance;
      address public owner;

      function PiggyBank() public {
          owner = msg.sender;
          balance = 0;
      }

      function deposit() public payable returns (uint) {
          balance += msg.value;
          return balance;
      }

      function withdraw(uint withdrawAmount) public returns (uint remainingBal) {
          require(msg.sender == owner);
          balance -= withdrawAmount;

          msg.sender.transfer(withdrawAmount);

          return balance;
      }
  }
*/

const forwarderOrigin = 'http://localhost:9013';

const initialize = () => {
    //Basic Actions Section
    const onboardButton = document.getElementById('connectButton'); //connect to our button from index.html

    const pub2inst = document.getElementById('publish2inst');

    const MetaMaskClientCheck = () => {

            onboardButton.innerText = 'Connected';
            onboardButton.disabled = true;
    };

    MetaMaskClientCheck();

    pub2inst.onclick = function () {
        location.href = "https://www.instagram.com/ar/201976634194380/?ch=NWNiNjI1YTVkZDkwYjE1MzY1OTgwOWFhNWNjMTNhNTI%3D";
    }
}

    window.addEventListener('DOMContentLoaded', initialize);