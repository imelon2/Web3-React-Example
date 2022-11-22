import "../css/Nav.css"
import { Link } from "react-router-dom";

function Nav(props) {
  const {
    isConnected,
    isSupported,
    connectWallet,
    currentBalance,
    walletAddress,
  } = props;

  const displayWalletAddress = `${walletAddress?.substring(0, 10)}...`;
  const displayCurrentBalance = `${currentBalance?.toFixed(4)}`;


  return (
    <nav className="nav">
            <div className="leftNav">
        <Link to={"/"}>Home</Link>
        <br />
        <Link to={"/EIP712"}>EIP712</Link>
        <br />
      </div>
      <div className="rightNav">
        <div className="connectButtonContainer">
          {isConnected ? (
            <div className="buttonContainer">
              <span className="pageButtonBold connectButton">
                {displayCurrentBalance} ETH
              </span>
              <span
                className={
                  isSupported
                    ? "pageButtonBold connectButton"
                    : "pageButtonBold networkErr"
                }
              >
                {isSupported ? "Goerli Testnet" : "Change Network"}
              </span>
              <span className="pageButtonBold connectButton">
                {displayWalletAddress}
              </span>
            </div>
          ) : (
            <div className="btn connectButton" onClick={() => connectWallet()}>
              Connect Wallet
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
