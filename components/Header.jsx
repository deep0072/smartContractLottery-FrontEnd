import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <div>
            Get Lottery
            <ConnectButton moralisAuth={false} />
        </div>
    )
}
