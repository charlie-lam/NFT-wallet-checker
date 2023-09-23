import { useEffect, useState } from "react";

export const WalletSummary = ({walletAddress, collections, ethPrice}) => {


    const [totalNfts, setTotalNfts] = useState(null);
    useEffect(() => {
            setTotalNfts(collections.map(collection => collection.nfts).reduce((acc, collectionNfts) => acc + collectionNfts.length, 0))
    })

    if(collections){
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
                {/* <div id="non-zero" className="sum-div">
                <p id="liquid-label">Liquid NFTs</p>
                <p id="liquid-nfts">{liquid}</p>
                </div>
                <div id="eth-value" className="sum-div">
                <p id="eth-label">NFT Eth Value</p>
                <p id="eth-total">{ethValue}</p>
                </div>
                <div id="dollar-value" className="sum-div">
                <p id="dollar-label">NFT Dollar Value</p>
                <p id="dollar-total">{dollarValue.toFixed(2)}</p>
                </div> */}
            </div>
        );
    }
}