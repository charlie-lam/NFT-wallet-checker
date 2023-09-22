const FetchCollections = async (address) => {
    let url = `https://api.opensea.io/api/v1/collections?asset_owner=${address}&offset=0&limit=300`;
    const response = await fetch(url);
    const collections = await response.json();
    return collections.map(collection => ({
      name: collection.slug,
      assets: collection.owned_asset_count,
      contractAddress: collection.primary_asset_contracts[0].address,
      details: collection.description,
      ident: collection.name,
      oneDaySales: collection.stats.one_day_sales,
      sevenDayVolume: collection.stats.seven_day_volume,
    }));
}