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

const forwarderOrigin = 'http://localhost:9010'

const initialize = () => {
    //Basic Actions Section
    const onboardButton = document.getElementById('connectButton'); //connect to our button from index.html

    //After this what we'd like to do next is whenever we press the eth_accounts button we'd like 
    //to get our Ethereum account and display it.
    const getAccountsButton = document.getElementById('getAccounts');
    const getAccountsResult = document.getElementById('getAccountsResult');

    const getArt = document.getElementById('art_pic');
    
 //   const getBalanceButton = document.getElementById('getBalance');
   // const getAccountBalance = document.getElementById('getBalanceResult');

    const pub2inst = document.getElementById('publish2inst');
   // const disconnect = document.getElementById('disconnect');


    //Created check function to see if the MetaMask extension is installed
    const isMetaMaskInstalled = () => {
        //Have to check the ethereum binding on the window object to see if it's installed
        const { ethereum } = window;
        return Boolean(ethereum && ethereum.isMetaMask);
    };

    const MetaMaskClientCheck = () => {
        if (!isMetaMaskInstalled()) {
            onboardButton.innerText = 'Click here to install Metamask!';

            //When the button is clicked we call th is function
            onboardButton.onclick = onClickInstall;

            onboardButton.disabled = false;
        } else {
            onboardButton.innerText = 'Connected';

            //When the button is clicked we call th is function
            onboardButton.onclick = onClickConnect;

            onboardButton.disabled = false;
        }

    };

    // create a new MetaMask onboarding object to use in our app
    const onboarding = new MetaMaskOnboarding({ forwarderOrigin });

    const onClickInstall = () => {
        onboardButton.innerText = 'Onboarding in progress';
        onboardButton.disabled = true;

        //On this object we have startOnboarding which will start the onboarding process for our end user
        onboarding.startOnboarding();
    };

    const onClickConnect = async () => {
        try {
            //Create an async function that will try to call the 'eth_requestAccounts' RPC method

            // Will open the MetaMask UI
            // You should disable this button while the request is pending!

            await ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            console.error(error);
        }
    };

    MetaMaskClientCheck();

    //Eth_Accounts-getAccountsButton
    getAccountsButton.addEventListener('click', async () => {
        //we use eth_accounts because it returns a list of addresses owned by us.
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        //We take the first address in the array of addresses and display it
        getAccountsResult.innerHTML = accounts[0] || 'Not able to get accounts';
    });


    ///?????????????
   /* getBalanceButton.addEventListener('click', async () => {
        const balance = await ethereum.request({ method: 'eth_getBalance' });
        //getAccountBalance.innerHTML = balance[0] || 'Not able to get balance'; //??????  такой массив тоже приходит??
    }); */

    getArt.onclick = function () {
        var src = 'img.png',
            img = document.createElement('img');

        img.src = src;
        documnet.body.appendChild(img);

    }

    pub2inst.onclick = function () {
        location.href = "https://www.instagram.com/ar/201976634194380/?ch=NWNiNjI1YTVkZDkwYjE1MzY1OTgwOWFhNWNjMTNhNTI%3D";
    }

    ///?????????????
   /* disconnect.onclick = async function () {
        try {
            deactivate()
        } catch (ex) {
            console.log(ex)
        }

    } */
};

window.addEventListener('DOMContentLoaded', initialize);
