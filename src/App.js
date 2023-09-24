import { fetchEthPrice } from "./ApiCalls/FetchEthPrice";
import {fetchNfts} from "./ApiCalls/FetchNfts";
import { fetchCollectionStats } from "./ApiCalls/FetchCollectionStats";
import {WalletForm} from "./components/WalletForm";
import {WalletSummary} from "./components/WalletSummary";
import { useState, useEffect } from "react";
import "./App.css"

const App = () => {

    const [ethPrice, setEthPrice] = useState("");
    const [priceError, setPriceError] = useState(false);

    const ReturnEthPrice = async () => {
        try{
            const price = await fetchEthPrice();
            setEthPrice(price);
        }
        catch (error){
            console.log(error);
            setPriceError(true);
        };
    };

    // useEffect(() => {
    //   ReturnEthPrice();
    // }, []);

    const [walletAddress, setWalletAddress] = useState("");
    const [collections, setCollections] = useState(null);
    const [nftCallError, setNftCallError] = useState(false);

    const ReturnNfts = async (address) => {
        try{
            return await fetchNfts(address);
        }
        catch (error){
            setNftCallError(true);
        }
    };

    const groupNfts = (nftArray) => {
      return nftArray.reduce((acc, nft) => {
        const {collection, ...rest} = nft;
        if(!acc[collection]){
          acc[collection] = [];
        }
        acc[collection].push(rest)
        return acc;
      }, {});
    }

    const ReturnCollectionStats = async (collectionName) => {
      try{
        const stats = await fetchCollectionStats(collectionName);
        const sevenDayVolume = stats["seven_day_volume"] ? stats["seven_day_volume"] : 0;
        const floorPrice = stats["floor_price"] ? stats["floor_price"] : 0;
        return {sevenDayVolume: sevenDayVolume, floorPrice: floorPrice};
    }
    catch (error){
        return {sevenDayVolume : 0, floorPrice : 0};
    };
    };

    const fillCollectionsStats = async (partialCollections) => {
      const statCompleteCollections = await Promise.all(
        partialCollections.map( async (collection) => {
          const collectionStats = await ReturnCollectionStats(collection.name)
          return {...collection, sevenDayVolume : collectionStats.sevenDayVolume, floorPrice : collectionStats.floorPrice}
        })
      )
      return statCompleteCollections;
    };

    const handleWalletSubmit = async (address) => {
        setWalletAddress(address);
        const returnedNfts = await ReturnNfts(address);
        const groupedNftObject = groupNfts(returnedNfts);
        const partialCollectionsArray = Object.entries(groupedNftObject).map(([name, nfts]) => ({
          name,
          nfts,
        }))
        const statFilledCollections = await fillCollectionsStats(partialCollectionsArray);
        setCollections(statFilledCollections);
    };

    return (
        <div id="whole">
          <header>
            <h2>NFT Wallet Checker</h2>
            <h4>Eth price:${ethPrice}</h4>
            {priceError && <h4>Eth price unavailable</h4>}
          </header>
          <div id="content">
            <WalletForm
              handleWalletSubmit={handleWalletSubmit}
              walletAddress={walletAddress}
            />
            {collections && (
              <WalletSummary
                walletAddress={walletAddress}
                collections={collections}
                ethPrice={ethPrice}
              />
            )}
            {nftCallError && <h4>Wallet unavailable</h4>}
            {/* {walletAddress !== "" && (
              <WalletNFTs completed={this.state.collections} />
            )} */}
          </div>
        </div>
      );
}

export default App;