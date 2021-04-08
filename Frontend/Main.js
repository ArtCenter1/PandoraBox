Moralis.initialize("irF5RmoJtDU4e23DsV0QYLyMBoSwBJC6UHwRc1zR");
Moralis.serverURL = 'https://rowkubhlshxr.moralis.io:2053/server'
//const TOKEN_CONTRACT_ADDRESS = "0xa13f135eed8B734DE667339cB73E033F34428132";

//enable Moralis web3 service
init = async () => {
    hideElement(userItemsSection);
    hideElement(userInfo);
    hideElement(createItemForm);
    window.web3 = await Moralis.Web3.enable();
    //window.tokenContract = new web3.eth.Contract(tokenContractAbi, TOKEN_CONTRACT_ADDRESS);
    initUser();
}
//check if user connected
initUser = async () => {
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

// metaMask login
login = async () => {
  try {
      await Moralis.Web3.authenticate();
      initUser();
  } catch (error) {
      alert(error)
  }
}

logout = async () => {
  await Moralis.User.logOut();
  hideElement(userInfo);
  initUser();
}

openUserInfo = async () => {
  user = await Moralis.User.current();
  if (user){    
      const email = user.get('email');
      if(email){
          userEmailField.value = email;
      }else{
          userEmailField.value = "";
      }

      userUsernameField.value = user.get('username');

      const userAvatar = user.get('avatar');
      if(userAvatar){
          userAvatarImg.src = userAvatar.url();
          showElement(userAvatarImg);
      }else{
          hideElement(userAvatarImg);
      }

      showElement(userInfo);
  }else{
      login();
  }
}

saveUserInfo = async () => {
  user.set('email', userEmailField.value);
  user.set('username', userUsernameField.value);
  //still need to handle duplicate username from users here

  if (userAvatarFile.files.length > 0) {
      const avatar = new Moralis.File("avatar.jpg", userAvatarFile.files[0]);
      user.set('avatar', avatar);
  }

  await user.save();
  alert("User info saved successfully!");
  openUserInfo();
}

createItem = async () => {

  if (createItemFile.files.length == 0){
      alert("Please select a file!");
      return;
  } else if (createItemNameField.value.length == 0){
      alert("Please give the item a name!");
      return;
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
const userUsernameField = document.getElementById("txtUsername");
const userEmailField = document.getElementById("txtEmail");
const userAvatarImg = document.getElementById("imgAvatar");
const userAvatarFile = document.getElementById("fileAvatar");

document.getElementById("btnCloseUserInfo").onclick = () => hideElement(userInfo);
document.getElementById("btnLogout").onclick = logout;
document.getElementById("btnSaveUserInfo").onclick = saveUserInfo;

// Item creation
const createItemForm = document.getElementById("createItem");

const createItemNameField = document.getElementById("txtCreateItemName");
const createItemDescriptionField = document.getElementById("txtCreateItemDescription");
const createItemPriceField = document.getElementById("numCreateItemPrice");
const createItemStatusField = document.getElementById("selectCreateItemStatus");
const createItemFile = document.getElementById("fileCreateItemFile");
document.getElementById("btnCloseCreateItem").onclick = () => hideElement(createItemForm);
document.getElementById("btnCreateItem").onclick = createItem;

init();