import "./App.css";
import React from "react";
import Button from "@mui/material/Button";

const getEthPrice = async () => {
  let url =
    "https://rest.coinapi.io/v1/exchangerate/ETH/USD?apikey=DA612043-61BE-4442-B1AF-85F00E6BCFE7";
  try {
    let res = await fetch(url);
    let jsonRes = await res.json();
    return jsonRes.rate;
  } catch (error) {
    return "Price Unavailable";
  }
};

const getWalletCollections = async (wallet) => {
  let url = `https://api.opensea.io/api/v1/collections?asset_owner=${wallet}&offset=0&limit=300`;
  try {
    const res = await fetch(url);
    let jsonRes = await res.json();
    return jsonRes.map((item) => ({
      name: item.slug,
      assets: item.owned_asset_count,
    }));
  } catch (error) {
    alert("Wallet Unavailable");
  }
};

const getCollectionData = async (collection) => {
  let url = `https://api.opensea.io/api/v1/collection/${collection}/stats`;
  try {
    const res = await fetch(url);
    let jsonRes = await res.json()
    return jsonRes.stats
  } catch {
    console.log("collection " + collection + " failed")
  }
  /* In the handle submit call this function with await each time after 2 seconds or so (with setTimeout) for each collection in collections state while  pushing to a new state key,value collection array in state, then youll have a map method on the collection array to add divs to the walletnfts react function to hopefully update one by one the collections. */
};

function WalletEnter(props) {
  return (
    <div id="form-div">
      <form id="wallet-ask">
        <label htmlFor="wallet-input">Eth wallet:</label>
        <br />
        <input
          type="text"
          name="wallet-input "
          id="wallet-input"
          placeholder="Enter here"
          value={props.typed}
          onChange={props.change}
        ></input>
        <button id="wallet-submit" onClick={props.submit}>
          Submit
        </button>
      </form>
    </div>
  );
}

function WalletSummary(props) {
  return (
    <div id="wallet-summary">
      <div id="address-section">
        <p id="wallet-label">Eth Wallet</p>
        <p id="wallet-id">{props.wallet}</p>
      </div>
      <div id="all-nfts">
        <p id="total-label">Total NFTs</p>
        <p if="total-nfts">{props.total}</p>
      </div>
      <div id="non-zero">
        <p id="liquid-label">Liquid NFTs</p>
        <p id="liquid-nfts"></p>
      </div>
      <div id="eth-value">
        <p id="eth-label">NFT Eth Value</p>
        <p id="eth-total"></p>
      </div>
      <div id="dollar-value">
        <p id="dollar-label"></p>
        <p id="dollar-total"></p>
      </div>
    </div>
  );
}

class WalletNFTs extends React.Component {
  render() {
    return <div id="nfts-whole"></div>;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wallet: "",
      darkMode: false,
      typed: "",
      collections: [],
      totalnfts: 0,
      collectionData:[]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ typed: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let processWallet = async (wallet) => {
      let dataCollections = await getWalletCollections(wallet);
      let totalNFTs = dataCollections
        .map((item) => item.assets)
        .reduce((a, b) => a + b);
      this.setState({
        collections: dataCollections,
        totalnfts: totalNFTs,
      });
      console.log(dataCollections);
    };
    this.setState({
      wallet: this.state.typed,
    });

    processWallet(this.state.typed);

    let processCollections = async (arr) => {
      let full = arr.map(item => {
         return Promise.resolve(getCollectionData(item.name))
      });

      console.log(full);

      let processed = full.map(item => (
        {floor: item.floor_price,
          oneDaySales: item.one_day_sales,
          oneDayAv: item.one_day_average_price,
          oneDayVolume:item.one_day_volume
      }));

      console.log(processed)
      
      let complete = processed.map(item => ({ ...item, ...arr[processed.indexOf(item)]}))

      this.setState({
        collectionData: complete
      });

      console.log(this.state.collections)
    };

    processCollections(this.state.collections);
    

  }

  render() {
    /*let ethPrice = getEthPrice();
    console.log(ethPrice)*/

    return (
      <div id="whole">
        <header>
          <h2>NFT Wallet Checker</h2>
          <h4>Eth price:</h4>
          <Button>{this.state.darkMode ? "Dark Mode" : "Light Mode"}</Button>
        </header>
        <div id="content">
          {this.state.wallet === "" && (
            <WalletEnter
              submit={this.handleSubmit}
              change={this.handleChange}
              typed={this.state.typed}
            />
          )}
          {this.state.wallet !== "" && (
            <WalletSummary
              wallet={this.state.wallet}
              collections={this.state.collections}
              total={this.state.totalnfts}
            />
          )}
          {this.state.wallet !== "" && <WalletNFTs />}
        </div>
      </div>
    );
  }
}

export default App;
