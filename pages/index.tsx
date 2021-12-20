import type { NextPage } from 'next'
import Head from 'next/head'
import Swaps from "../components/swaps";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Marduk admin dashboard</title>
        <meta name="description" content="Marduk admin dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold mt-3 ">
          Marduk admin dashboard
        </h1>
        <Swaps />
      </main>

    </div>
  )
}

export default Home
