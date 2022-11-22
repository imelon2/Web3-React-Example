import { ethers } from "ethers";

export const WalletRPC = async () => {
  // Save Provider
  const provider = await new ethers.providers.Web3Provider(window.ethereum);
  // requrest access to Wallet
  await provider.send("eth_requestAccounts", []); // error.code === 4001
  // Save signer
  const signer = provider.getSigner();

  return {
    provider,
    signer
  }
};

export const WalletData = async (signer) => {
    const result = await Promise.all([
      signer.getAddress(),
      signer.getBalance(),
      signer.getChainId(),
    ]);

    return {
        adress : result[0],
        balance : Number(ethers.utils.formatEther(result[1])),
        chainId : result[2]
    }
  };


  // event
 export const event = (_connectWallet) => {
    window.ethereum.on("chainChanged", async () => {
      await _connectWallet();
    });

    window.ethereum.on("accountsChanged", async () => {
      await _connectWallet();
    });
  };