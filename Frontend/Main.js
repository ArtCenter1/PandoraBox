Moralis.initialize("irF5RmoJtDU4e23DsV0QYLyMBoSwBJC6UHwRc1zR");
Moralis.serverURL = 'https://rowkubhlshxr.moralis.io:2053/server'
const TOKEN_CONTRACT_ADDRESS = "0xa13f135eed8B734DE667339cB73E033F34428132";

//enable Moralis web3 service
init = async () => {
    hideElement(userItemsSection);
    hideElement(userInfo);
    hideElement(createItemForm);
    window.web3 = await Moralis.Web3.enable();
    window.tokenContract = new web3.eth.Contract(tokenContractAbi, TOKEN_CONTRACT_ADDRESS);
    initUser();
}

initUser = async() => {
    if (await Moralis.User.current()){
      hideElement(userConnectButton);
      showElement(userProfileButton);
      showElement(openCreateItemButton);
      showElement(openUserItemsButton);
      loadUserItems();
    }else{
      showElement(userConnectButton);
      hideElement(userProfileButton);
      hideElement(openCreateItemButton);
      hideElement(openUserItemsButton);
    }
}

login = async () => {
  try{
    await Moralis.webs.autoenticate();
  } catch (error){

  }
}
