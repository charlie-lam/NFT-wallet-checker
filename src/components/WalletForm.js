import { useState } from "react";

export const WalletForm = ({walletAddress, submit}) => {
    
    const [typed, setTyped] = useState("")

    const onChange = (event) => {
      setTyped(event.value)
    }
    
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
        <form id="wallet-ask">
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
          <button id="wallet-submit" onClick={submit(typed)}>
            Submit
          </button>
        </form>
      </div>
    );
  }