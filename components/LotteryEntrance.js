import { useWeb3Contract } from "react-moralis"

import { contractAddresses, abi } from "../constants"
import { useMoralis } from "react-moralis"

import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"

console.log(contractAddresses)

export default function LotteryEntrace() {
    const { chainId: chainIdhex, isWeb3Enabled, isLoading, isFetching } = useMoralis() // with help of moralis hook we are getting chain id on network switch
    const chainId = parseInt(chainIdhex) // parsing chainId into int format
    console.log(chainId in contractAddresses)

    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    //checking chain id have contract address or not

    const [entranceFee, setEntranceFee] = useState("0") // it will set entrance fee value
    const [recentWinner, setrecentWinner] = useState("0") // it will set entrance fee value
    const [numberOfPlayers, setnumPlayer] = useState("0")

    const dispatch = useNotification() // dispatch gives us  little pop up of notification
    const { runContractFunction: enterRaffle } = useWeb3Contract({
        // it will call the enterRaffle
        abi: abi,
        contractAddress: raffleAddress, // take contract address
        functionName: "enterRaffle", // function anme
        params: {},
        msgValue: entranceFee, // entrance fee
    })
    console.log(raffleAddress, "raffle deepak")
    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        // it will get the entrance fee from deployed contract
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee", //,
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        // it will get the entrance fee from deployed contract
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner", //,
        params: {},
    })
    const { runContractFunction: getNumberOfplayer } = useWeb3Contract({
        // it will get the entrance fee from deployed contract
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfplayer", //,
        params: {},
    })

    async function updateUi() {
        const entranceFeeFromcall = (await getEntranceFee()).toString()
        setEntranceFee(entranceFeeFromcall)
        const recentWinnerFromCall = await getRecentWinner()
        console.log(recentWinnerFromCall, "recentWinner")
        setrecentWinner(recentWinnerFromCall)
        const numberOfPlayersFromCall = (await getNumberOfplayer()).toString()
        setnumPlayer(numberOfPlayersFromCall)
    }

    // this use effect get the entrance fee whenenver wallet connect
    useEffect(() => {
        if (isWeb3Enabled) {
            updateUi()
        }
    }, [isWeb3Enabled])

    // this function will triiger the newNotification function that cause the dispatch function to be called
    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUi()
    }

    // this function will triiger the notification after entering into raffle contract
    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "transaction completed successfully",
            title: "Tx notification received",
            position: "topR",
            icon: "bell",
        })
    }
    return (
        <div>
            hi from lottery entrance
            {raffleAddress ? (
                <div>
                    <button
                        className="bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={async function () {
                            await enterRaffle({
                                onSuccess: handleSuccess,
                                onError: (error) => {
                                    console.log(error)
                                },
                            })
                        }}
                        disabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            <div>Enter Raffle</div>
                        )}
                    </button>
                    Lottery entrance Fee is:{ethers.utils.formatUnits(entranceFee, "ether")}
                    <br />
                    NUMBER OF PLAYER : {numberOfPlayers}
                    recentWinner : {recentWinner}
                </div>
            ) : (
                <div> no raffle address </div>
            )}
        </div>
    )
}
