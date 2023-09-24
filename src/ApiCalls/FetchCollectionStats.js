export const fetchCollectionStats = async (slug) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": `${process.env.REACT_APP_OPENSEA_API_KEY}`,
    },
  };

  const response = await fetch(
    `https://api.opensea.io/api/v1/collection/${slug}/stats`,
    options,
  );
  const stats = await response.json();
  return stats.stats;
};
