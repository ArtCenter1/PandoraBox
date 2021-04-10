const PandoraBoxToken = artifacts.require("PandoraBoxToken.sol");

module.exports = function(deployer) {
  deployer.deploy(PandoraBoxToken);
};