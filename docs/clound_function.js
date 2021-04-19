Moralis.Cloud.define("getUserItems", async (request) => {

    const query = new Moralis.Query("NFTTokenOwners");
    query.equalTo("contract_type", "ERC721");
    query.containedIn("owner_of", request.user.attributes.accounts);
    const queryResults = await query.find();
    const results = [];
    for (let i = 0; i < queryResults.length; ++i) {
      results.push({
        "tokenObjectId": queryResults[i].id,
        "tokenId": queryResults[i].attributes.token_id,
        "tokenAddress": queryResults[i].attributes.token_address,
        "symbol": queryResults[i].attributes.symbol,
        "tokenUri": queryResults[i].attributes.token_uri,
      });
    }
    return results;
  });