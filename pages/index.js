import Head from "next/head"

import styles from "../styles/Home.module.css"

import Header from "../components/Header"
import LotteryEntrace from "../components/LotteryEntrance.js"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Lottery App</title>
                <meta name="description" content="Smart contract Lottery app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <LotteryEntrace />

            {/* <ManualHeader /> */}
        </div>
    )
}
