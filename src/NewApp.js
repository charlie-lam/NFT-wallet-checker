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

    const handleWalletSubmit = (address) => {
        setWalletAddress(address);
    } ;
    
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
                wallet={this.state.wallet}
                collections={this.state.collections}
                total={this.state.totalnfts}
                liquid={this.state.nftsLiquid}
                ethValue={this.state.ethValue}
                dollarValue={this.state.ethValue * Number(this.state.ethPrice)}
              />
            )}
            {this.state.wallet !== "" && (
              <WalletNFTs completed={this.state.collections} />
            )}
          </div>
        </div>
      );
}