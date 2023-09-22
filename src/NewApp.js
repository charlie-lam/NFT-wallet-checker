import FetchEthPrice from "./ApiCalls/FetchEthPrice";
import FetchCollections from "./ApiCalls/FetchCollections";
import WalletForm from "./components/WalletForm";
import { useState, useEffect } from "react";

const App = () => {

    const [ethPrice, setEthPrice] = useState("");
    const [priceError, setPriceError] = useState(false);

    const ReturnEthPrice = async () => {
        try{
            return await FetchEthPrice();
        }
        catch (error){
            console.log(error);
            setPriceError(true);
        };
    };

    useEffect(() => {
        setEthPrice(ReturnEthPrice());
    }, []);

    const [walletAddress, setWalletAddress] = useState("");
    const [collections, setCollections] = useState([]);
    const [collectionsError, setCollectionsError] = useState(false);

    const ReturnCollections = async (address) => {
        try{
            return await FetchCollections(address);
        }
        catch (error){
            console.log(error)
            setCollectionsError(true);
        }
        
    };


    const handleWalletSubmit = (address) => {
        setWalletAddress(address);
        const collections = ReturnCollections(address);
        setCollections(collections);
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
              submit={handleWalletSubmit}
              walletAddress={walletAddress}
            />
            {this.state.wallet !== "" && (
              <WalletSummary
                wallet={walletAddress}
                collections={collections}
                ethPrice={ethPrice}
              />
            )}
            {this.state.wallet !== "" && (
              <WalletNFTs completed={this.state.collections} />
            )}
          </div>
        </div>
      );
}