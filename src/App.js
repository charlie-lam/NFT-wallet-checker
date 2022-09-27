import "./App.css";
import React from "react";

const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

const getWalletCollections = async (wallet) => {
  let url = `https://api.opensea.io/api/v1/collections?asset_owner=${wallet}&offset=0&limit=300`;
  try {
    const res = await fetch(url, options);
    let jsonRes = await res.json();
    return jsonRes.map((item) => ({
      name: item.slug,
      assets: item.owned_asset_count,
    }));
  } catch (error) {
    alert("Wallet Unavailable");
  }
};

function WalletEnter(props) {
  let styleFull = {
    width: "20%",
    display: "flex",
    flexDirection: "column",
    padding: 10,
    borderRadius: 10,
  };
  let defaultStyle;
  return (
    <div id="form-div" style={props.wallet !== "" ? styleFull : defaultStyle}>
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
      <div id="address-section" className="sum-div">
        <p id="wallet-label">Eth Wallet</p>
        <p id="wallet-id">{props.wallet}</p>
      </div>
      <div id="all-nfts" className="sum-div">
        <p id="total-label">Total NFTs</p>
        <p if="total-nfts">{props.total}</p>
      </div>
      <div id="non-zero" className="sum-div">
        <p id="liquid-label">Liquid NFTs</p>
        <p id="liquid-nfts">{props.liquid}</p>
      </div>
      <div id="eth-value" className="sum-div">
        <p id="eth-label">NFT Eth Value</p>
        <p id="eth-total">{props.ethValue}</p>
      </div>
      <div id="dollar-value" className="sum-div">
        <p id="dollar-label">NFT Dollar Value</p>
        <p id="dollar-total">{props.dollarValue}</p>
      </div>
    </div>
  );
}

class WalletNFTs extends React.Component {
  render() {
    const nfts = this.props.completed.map((item) => (
      <div className="nft-div" key={item.name}>
        <div className="name-div">
          <p>{item.name}</p>
        </div>
        <div className="floor-div">
          <p>Floor price</p>
          <p>{item.floor}</p>
        </div>
        <div className="asset-div">
          <p>Count</p>
          <p>{item.assets}</p>
        </div>
        <div className="volume-div">
          <p>One day sales</p>
          <p>{item.oneDaySales}</p>
        </div>
        <div className="value-div">
          <p>Collection value</p>
          <p>{item.collectionValue}</p>
        </div>
      </div>
    ));
    return <div id="nfts-whole">{nfts}</div>;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wallet: "",
      typed: "",
      priceLoaded: false,
      collections: [],
      totalnfts: 0,
      ethPrice: "",
      ethValue: 0,
      nftsLiquid: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.processWallet = this.processWallet.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async processWallet(wallet) {
    let dataCollections = await getWalletCollections(wallet);
    let totalNFTs = dataCollections
      .map((item) => item.assets)
      .reduce((a, b) => a + b);
    console.log(dataCollections);
    const collectionsFull = await Promise.all(
      dataCollections.map(async (item) => {
        const json = await fetch(
          `https://api.opensea.io/api/v1/collection/${item.name}/stats`,
          options
        ).then((response) => {
          return response.json();
        });
        let obj = {
          name: item.name,
          assets: item.assets,
          floor:
            json.stats.seven_day_volume > 0.01 ? json.stats.floor_price : 0,
          oneDaySales: json.stats.one_day_sales,
          oneDayAv: json.stats.one_day_average_price,
          oneDayVolume: json.stats.one_day_volume,
          collectionValue:
            json.stats.seven_day_volume > 0.015
              ? json.stats.floor_price * item.assets
              : 0,
        };
        return obj;
      })
    );
    console.log(collectionsFull);

    let ethTotal = collectionsFull
      .map((item) => item.collectionValue)
      .reduce((a, b) => a + b);

    let liquidNfts = collectionsFull
      .filter((item) => item.collectionValue > 0)
      .map((item) => item.assets)
      .reduce((a, b) => a + b);

    let sorted = collectionsFull.sort(function (a, b) {
      return b.collectionValue - a.collectionValue;
    });

    console.log(sorted);

    this.setState({
      collections: sorted,
      totalnfts: totalNFTs,
      ethValue: ethTotal.toFixed(2),
      nftsLiquid: liquidNfts,
    });
  }

  componentDidMount() {
    fetch(
      "https://rest.coinapi.io/v1/exchangerate/ETH/USD?apikey=DA612043-61BE-4442-B1AF-85F00E6BCFE7"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((json) => {
        this.setState({
          ethPrice: json.rate.toFixed(2),
          priceLoaded: true,
        });
      })
      .catch((response) => {
        console.log(response.status, response.statusText);
        this.setState({
          ethPrice: "Price Unavailable",
        });
      });
  }

  handleClick() {
    console.log(this.state);
  }

  handleChange(event) {
    this.setState({ typed: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      wallet: this.state.typed,
    });

    let finish = async () => {
      await this.processWallet(this.state.typed);
    };

    finish();
  }

  render() {
    return (
      <div id="whole">
        <header>
          <h2>NFT Wallet Checker</h2>
          <h4>Eth price:${this.state.ethPrice}</h4>
        </header>
        <div id="content">
          <WalletEnter
            submit={this.handleSubmit}
            change={this.handleChange}
            typed={this.state.typed}
            wallet={this.state.wallet}
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
}

export default App;
