export const fetchNfts = async (address) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": `${process.env.REACT_APP_OPENSEA_API_KEY}`,
    },
  };

  const response = await fetch(
    `https://api.opensea.io/v2/chain/ethereum/account/${address}/nfts`,
    options,
  );
  const nfts = await response.json();
  return nfts.nfts;
};
