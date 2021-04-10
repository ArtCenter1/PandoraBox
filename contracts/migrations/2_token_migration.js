const PandoraBoxToken = artifacts.require("PandoraBoxToken");

module.exports = function(deployer) {
  deployer.deploy(PandoraBoxToken);
};