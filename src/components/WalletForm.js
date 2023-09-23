import { useState } from "react";

export const WalletForm = ({walletAddress, handleWalletSubmit}) => {
    
    const [typed, setTyped] = useState("")

    const onChange = (event) => {
      setTyped(event.target.value)
    }

    const onSubmit = (event) => {
      event.preventDefault();
      handleWalletSubmit(typed);
    };
    
    let styleFull = {
      width: "20%",
      display: "flex",
      flexDirection: "column",
      padding: 10,
      borderRadius: 10,
    };
    let defaultStyle;
    return (
      <div id="form-div" style={walletAddress !== "" ? styleFull : defaultStyle}>
        <form id="wallet-ask" onSubmit={onSubmit}>
          <label htmlFor="wallet-input">Eth wallet:</label>
          <br />
          <input
            type="text"
            name="wallet-input "
            id="wallet-input"
            placeholder="Enter here"
            value={typed}
            onChange={onChange}
          ></input>
          <input id="wallet-submit" type="submit" value="Submit" />
        </form>
      </div>
    );
  }