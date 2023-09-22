import FetchEthPrice from "./ApiCalls/FetchEthPrice";

const App = () => {

    const [ethPrice, setEthPrice] = useState("");

    const ReturnEthPrice = async () => {
        return await FetchEthPrice();
    }

    useEffect(() => {
        SetEthPrice(ReturnEthPrice());
    }, []);

    const [walletAddress, setWalletAddress] = useState("");

    const [collections, setCollections] = useState([]);

    const ReturnCollections = async (address) => {
        return await FetchCollections(address);
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
          </header>
          <div id="content">
            <WalletForm
              submit={() => handleWalletSubmit(address)}
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