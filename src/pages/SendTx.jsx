import { useState, useCallback } from "react";
const { ethers,Contract } = require("ethers");

function SendTx(props) {
    const { signer,provider } = props;
    const contractAddress = "스마트컨트렉트 주소";
    const ABI = "ABI 데이터"
    const sendTransaction = useCallback(async() => {

        /** web3 send Transaction */
        // const contract = new web3.eth.Contract(abi,contractAddress)
        // const transaction = {
        //     'from' :account.address, 
        //     'gas': 95000,
        //     'gasPrice' : web3.utils.toWei("35", "gwei"),
        // };
        // let result = await contract.methods.메소드명({파라미터}).send(transaction);

        /** ethers send Transaction
         * Provider를 전달하면 읽기 전용 액세스(예: 상수 호출)만 있는 다운그레이드 된 Contract가 반환됩니다.
         * Signer를 전달하면 해당 서명자를 대신하여 작동할 계약이 반환 됩니다.
         */
        // const contract = new Contract(contractAddress,ABI,provider); or
        const contract = new Contract(contractAddress,ABI,signer);
        const txHash = await contract.connect(signer).메소드명({파라미터});
        const txResult =  await txHash.wait();

        
    },[])

    return (
        <div>HI</div>
    )
}

export default SendTx;