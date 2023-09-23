import { useEffect, useState } from "react";

export const WalletSummary = ({walletAddress, collections, ethPrice}) => {


    const [totalNfts, setTotalNfts] = useState(0);
    const [liquidNfts, setLiquidNfts] = useState(0);
    const [ethValue, setEthValue] = useState(0);
    const [dollarValue, setDollarValue] = useState(0);

    useEffect(() => {
        setTotalNfts(collections.map(collection => collection.nfts).reduce((acc, collectionNfts) => acc + collectionNfts.length, 0));
        const filteredCollections = collections.filter(collection => collection.collectionStats["seven_day_volume"] > 0.01);
        setLiquidNfts(filteredCollections.map(collection => collection.nfts).reduce((acc, collectionNfts) => acc + collectionNfts.length, 0));
        setEthValue(filteredCollections.map(collection => collection.collectionStats["floor_price"]).reduce((acc, floor) => acc + floor));
        setDollarValue(ethValue*ethPrice);
    })

    return ( 
            <div id="wallet-summary">
                <div id="address-section" className="sum-div">
                <p id="wallet-label">Eth Wallet</p>
                <p id="wallet-id">{walletAddress}</p>
                </div>
                <div id="all-nfts" className="sum-div">
                <p id="total-label">Total NFTs</p>
                <p if="total-nfts">{totalNfts}</p>
                </div>
                <div id="non-zero" className="sum-div">
                <p id="liquid-label">Liquid NFTs</p>
                <p id="liquid-nfts">{liquidNfts}</p>
                </div>
                <div id="eth-value" className="sum-div">
                <p id="eth-label">NFT Eth Value</p>
                <p id="eth-total">{ethValue}</p>
                </div>
                <div id="dollar-value" className="sum-div">
                <p id="dollar-label">NFT Dollar Value</p>
                <p id="dollar-total">{dollarValue.toFixed(2)}</p>
                </div>
            </div>
        );
}