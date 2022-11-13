import { useWeb3Contract } from "react-moralis"

import { contractAddresses, abi } from "../constants"
import { useMoralis } from "react-moralis"

import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { Button } from "web3uikit"

console.log(contractAddresses)

export default function LotteryEntrace() {
    const { chainId: chainIdhex, isWeb3Enabled } = useMoralis() // with help of moralis hook we are getting chain id on network switch
    const chainId = parseInt(chainIdhex) // parsing chainId into int format

    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    //checking chain id have contract address or not

    const [entranceFee, setEntranceFee] = useState("0") // it will set entrance fee value
    const { runContractFunction: enterRaffle } = useWeb3Contract({
        // it will call the enterRaffle
        abi: abi,
        contractAddress: raffleAddress, // take contract address
        functionName: "enterRaffle", // function anme
        params: {},
        msgValue: entranceFee, // entrance fee
    })
    console.log(raffleAddress, "raffle address")
    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        // it will get the entrance fee from deployed contract
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee", //,
        params: {},
    })

    // this use effect get the entrance fee whenenver wallet connect
    useEffect(() => {
        if (isWeb3Enabled) {
            async function updateUi() {
                const entranceFeeFromcall = (await getEntranceFee()).toString()
                setEntranceFee(entranceFeeFromcall)
            }
            updateUi()
        }
    }, [isWeb3Enabled])

    return (
        <div>
            hi from lottery entrance
            {raffleAddress ? (
                <div>
                    <button
                        onClick={async function () {
                            await enterRaffle()
                        }}
                    >
                        enter Raffle
                    </button>
                    Lottery entrance Fee is:{ethers.utils.formatUnits(entranceFee, "ether")}
                </div>
            ) : (
                <div> no raffle address </div>
            )}
        </div>
    )
}
