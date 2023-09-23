import FetchEthPrice from "./ApiCalls/FetchEthPrice";
import FetchNfts from "./ApiCalls/FetchNfts";
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
    const [nfts, setNfts] = useState([]);
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

    const handleWalletSubmit = (address) => {
        setWalletAddress(address);
        const returnedNfts = ReturnNfts(address);
        setNfts(returnedNfts);
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
            {walletAddress !== "" && (
              <WalletSummary
                walletAddress={walletAddress}
                nfts={nfts}
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