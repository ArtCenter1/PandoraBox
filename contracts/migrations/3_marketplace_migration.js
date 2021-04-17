const PBoxMarketplace = artifacts.require("PBoxMarketplace");

module.exports = function(deployer) {
  deployer.deploy(PBoxMarketplace);
};
