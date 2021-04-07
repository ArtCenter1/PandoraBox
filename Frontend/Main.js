Moralis.initialize("irF5RmoJtDU4e23DsV0QYLyMBoSwBJC6UHwRc1zR");
Moralis.serverURL = 'https://rowkubhlshxr.moralis.io:2053/server'
//const TOKEN_CONTRACT_ADDRESS = "0xa13f135eed8B734DE667339cB73E033F34428132";

//enable Moralis web3 service
init = async () => {
    //hideElement(userItemsSection);
    hideElement(userInfo);
    //hideElement(createItemForm);
    window.web3 = await Moralis.Web3.enable();
    //window.tokenContract = new web3.eth.Contract(tokenContractAbi, TOKEN_CONTRACT_ADDRESS);
    initUser();
}
//check if user connected
initUser = async () => {
    if (await Moralis.User.current()){
      hideElement(userConnectButton);
      showElement(userProfileButton);
      //showElement(openCreateItemButton);
      //showElement(openUserItemsButton);
      //loadUserItems();
    }else{
      showElement(userConnectButton);
      hideElement(userProfileButton);
      //hideElement(openCreateItemButton);
      //hideElement(openUserItemsButton);
    }
}

// metaMask login
login = async () => {
  try {
      await Moralis.Web3.authenticate();
      initUser();
  } catch (error) {
      alert(error)
  }
}

openUserInfo = async () => {
  user = await Moralis.User.current();
  if (user){    
      showElement(userInfo);
  }else{
      login();
  }
}

logout = async () => {
  await Moralis.User.logOut();
  hideElement(userInfo);
  initUser();
}


hideElement = (element) => element.style.display ="none";
showElement = (element) => element.style.display ="block";

// Navbar
const userConnectButton = document.getElementById("btnConnect");
userConnectButton.onclick = login;

const userProfileButton = document.getElementById("btnUserInfo");
userProfileButton.onclick = openUserInfo;

//  User profile
const userInfo = document.getElementById("userInfo");
document.getElementById("btnCloseUserInfo").onclick = () => hideElement(userInfo);
document.getElementById("btnLogout").onclick = logout;

init();