Moralis.initialize("irF5RmoJtDU4e23DsV0QYLyMBoSwBJC6UHwRc1zR");
Moralis.serverURL = 'https://rowkubhlshxr.moralis.io:2053/server'

init = async () => {
    window.web3 = await Moralis.web3.enable();
    initUer();
}

initUser = async() => {
    if (await Moralis.User.current()){
        hideElement(userConnectButton);
        showElement(usrProfileButton);
    }else{
        showElement(userConnectButton);
        hideElement(userProfileButton);
    }
}

login = async () => {
  try{
    await Moralis.webs.autoenticate();
  } catch (error){
    
  }
}
