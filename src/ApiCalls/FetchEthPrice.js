const FetchEthPrice = async () => {
    const response = await fetch("https://rest.coinapi.io/v1/exchangerate/ETH/USD?apikey=DA612043-61BE-4442-B1AF-85F00E6BCFE7");
    const data = response.json();
    const price = data.rate.toFixed(2);
    return price;
}