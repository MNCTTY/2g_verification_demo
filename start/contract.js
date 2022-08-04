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

const forwarderOrigin = 'http://localhost:9010';

const initialize = () => {
    //Basic Actions Section
    const onboardButton = document.getElementById('connectButton'); //connect to our button from index.html

    const getAccountsButton = document.getElementById('getAccounts');
    const getAccountsResult = document.getElementById('getAccountsResult');

    const getArt = document.getElementById('art_pic');
    const img_place = document.getElementById('img_place');

    const pub2inst = document.getElementById('publish2inst');
    const text_place = document.getElementById('text_place');

    /// new 
    /*
    if (window.ethereum) {
        handleEthereum();
    } else {
        window.addEventListener('ethereum#initialized', handleEthereum, {
            once: true,
        });

        // If the event is not dispatched by the end of the timeout,
        // the user probably doesn't have MetaMask installed.
        setTimeout(handleEthereum, 3000); // 3 seconds
    }
    
    function handleEthereum() {
        const { ethereum } = window;
        if (ethereum && ethereum.isMetaMask) {
            console.log('Ethereum successfully detected!');
            // Access the decentralized web!
        } else {
            console.log('Please install MetaMask!');
        }
    }
    */
    /// end of new

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
            onboardButton.innerText = 'Connect';

            //When the button is clicked we call th is function
            onboardButton.onclick = onClickConnect;

            onboardButton.disabled = false;
            onboardButton.innerText = 'Connected';
           // onboardButton.disabled = true;
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

    getArt.onclick = function () {
        var src = 'img.png', //путь к картинке, она у меня лежит локально в этой же папке
            img = document.createElement('img');

        img.src = src;
        img.style.height = '150px';
        img.style.width = '250px';
        // documnet.body.appendChild(img);
        img_place.appendChild(img);
        getArt.disabled = true;
    }

    pub2inst.onclick = function () {
        location.href = "https://www.instagram.com/ar/201976634194380/?ch=NWNiNjI1YTVkZDkwYjE1MzY1OTgwOWFhNWNjMTNhNTI%3D";
       // text_place.innerHTML = "Your art was sent to the queue for approval. Come back later! Your queue id is 27.";
       // pub2inst.disabled = true;
    }
}

    window.addEventListener('DOMContentLoaded', initialize);