import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import ManualHeader from "../components/ManualHeader"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Lottery App</title>
                <meta name="description" content="Smart contract Lottery app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1>
                {
                    " hello ready to lose your money. haha just kidding... it is decentralised Lotteryapp. "
                }
            </h1>

            <ManualHeader />
        </div>
    )
}
