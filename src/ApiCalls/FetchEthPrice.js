const FetchEthPrice = async () => {
    const response = await fetch(`https://rest.coinapi.io/v1/exchangerate/ETH/USD?apikey=${process.env.REACT_APP_COIN_API_KEY}`);
    const data = await response.json();
    const price = data.rate.toFixed(2);
    return price;
}