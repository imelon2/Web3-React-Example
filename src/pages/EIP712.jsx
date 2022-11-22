import { ethers } from "ethers";
import { TypedDataUtils } from "ethers-eip712";

function EIP712(props) {
  const { walletAddress, currentBalance, chainId, signer, provider } = props;

  const EIP712Domain = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "uint256" },
    { name: "verifyingContract", type: "address" },
  ];
  const SignUpData = [
    { name: "_name", type: "string" },
    { name: "_age", type: "uint8" },
  ];
  const DomainData = {
    chainId: 1,
    name: "EIP712_BTD",
    verifyingContract: "0x0fC5025C764cE34df352757e82f7B5c4Df39A836",
    version: "1",
  };

  const Message = {
    _name: "won",
    _age: 28,
  };

  const msgParams = {
      domain: DomainData,
      message: Message,
      primaryType: "SignUpData",
    types: {
      EIP712Domain: EIP712Domain,
      SignUpData: SignUpData,
    },
  };

  const getSignature = async () => {
    const account = await signer.getAddress();
    console.log(account);
    // const sign = ethers.utils._TypedDataEncoder.encode(msgParams.domain,msgParams.types,msgParams.message)
    const sign = TypedDataUtils.encodeDigest(msgParams)
    const signature = await signer.signMessage(sign)
    // const sign = await signer._signTypedData(msgParams.domain,msgParams.types,msgParams.message)
    // const digest = ethers.utils._TypedDataEncoder.encode(msgParams)
    // signer
    // let result = await window.ethereum.request({
    //   method: "eth_signTypedData_v4",
    //   params: [account, msgParams],
    //   from: account,
    // });
    console.log(sign);
    console.log(signature);
    // const verifiedAddress = ethers.utils.verifyTypedData(
    //     msgParams.domain,
    //     msgParams.types,
    //     msgParams.message,
    //     sign
    //   );
    // console.log(verifiedAddress);
  };

  const getPersonalSignature = async () => {
    const account = await signer.getAddress();
    const msgParams =
      "0x6520f425d164e04ba27f398bafe31f0ecfd4a09b7bda200c94de8e673d554299";
    let result = await window.ethereum.request({
      method: "personal_sign",
      params: [account, msgParams],
    });
    console.log(result);
  };
  return (
    <div>
      EIP712
      <button onClick={getSignature}>test</button>
      <button onClick={getPersonalSignature}>test2</button>
    </div>
  );
}

export default EIP712;
