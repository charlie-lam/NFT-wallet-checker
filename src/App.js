import { FetchEthPrice } from "./ApiCalls/FetchEthPrice";
import {FetchNfts} from "./ApiCalls/FetchNfts";
import {WalletForm} from "./components/WalletForm";
import {WalletSummary} from "./components/WalletSummary";
import { useState, useEffect } from "react";
import "./App.css"

const App = () => {

    const [ethPrice, setEthPrice] = useState("");
    const [priceError, setPriceError] = useState(false);

    const ReturnEthPrice = async () => {
        try{
            const price = await FetchEthPrice();
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
            return await FetchNfts(address);
        }
        catch (error){
            console.log(error)
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

    const handleWalletSubmit = async (address) => {
        setWalletAddress(address);
        const returnedNfts = await ReturnNfts(address);
        console.log(returnedNfts);
        const groupedNftObject = groupNfts(returnedNfts);
        console.log(groupedNftObject);
        const partialCollectionsArray = Object.entries(groupedNftObject).map(([name, nfts]) => ({
          name,
          nfts,
        }))
        setCollections(partialCollectionsArray);
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