import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useCallback } from "react";
import { WalletRPC, WalletData, event } from "./helper/Wallet";

import Home from "./pages/Home";
import Nav from "./components/Nav";
import EIP712 from "./pages/EIP712";
import SendTx from "./pages/SendTx";



function App() {
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [walletAddress, setWalletAddress] = useState(undefined);
  const [currentBalance, setCurrentBalance] = useState(undefined);
  const [chainId, setChainId] = useState(undefined);

  const [isSupported, setIsSupported] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = useCallback(async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        await _connectWallet();
        event(_connectWallet);
        setIsConnected(true);
      } else {
        // todo :
        alert("please install MetaMask");
      }
    } catch (error) {
      console.log(error);
    }
  });

  const _connectWallet = useCallback(async () => {
    const RPC = await WalletRPC();
    setProvider(RPC.provider);
    setSigner(RPC.signer);

    const WALLETDATA = await WalletData(RPC.signer);
    setWalletAddress(WALLETDATA.adress);
    setCurrentBalance(WALLETDATA.balance);
    setChainId(WALLETDATA.chainId);

    // Goerli(5)네트워크만 가능
    setIsSupported(WALLETDATA.chainId === 5 ? true : false);
  });

  return (
    <BrowserRouter>
      <div className="App">
        <Nav
          isConnected={isConnected}
          isSupported={isSupported}
          connectWallet={connectWallet}
          walletAddress={walletAddress}
          currentBalance={currentBalance}
          chainId={chainId}
        />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/EIP712"
            element={
              <EIP712
                walletAddress={walletAddress}
                currentBalance={currentBalance}
                chainId={chainId}
                signer={signer}
                provider={provider}
              />
            }
          ></Route>
          <Route path="/SendTx" element={<SendTx />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
