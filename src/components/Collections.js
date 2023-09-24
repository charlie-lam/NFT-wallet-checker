export const Collections = ({ collections }) => {
  const collectionArray = collections
    .filter((collection) => collection.floorPrice > 0)
    .map((collection) => (
      <div className="nft-div" key={collection.name}>
        <hr />
        <h2>{collection.name}</h2>
        <p>{collection.nfts[0].contract}</p>
        <div className="nft-summ">
          <div className="floor-div">
            <p>Floor price</p>
            <p>{collection.floorPrice}</p>
          </div>
          <div className="asset-div">
            <p>Count</p>
            <p>{collection.nfts.length}</p>
          </div>
          <div className="volume-div">
            <p>Seven day volume</p>
            <p>{collection.sevenDayVolume}</p>
          </div>
          <div className="value-div">
            <p>Collection value</p>
            <p>{collection.nfts.length * collection.floorPrice}</p>
          </div>
        </div>
        <div className="grouped-div">
          {collection.nfts.map((nft) => (
            <div className="individual-div" key={nft["name"]}>
              <img src={nft["image_url"]} alt="Corresponding NFT"></img>
              <h5>{nft["name"]}</h5>
            </div>
          ))}
        </div>
      </div>
    ));

  return (
    <>
      {collections.length > 0 && <div id="nfts-full">{collectionArray}</div>}
      {!collections && <h5>Loading....</h5>}
    </>
  );
};
