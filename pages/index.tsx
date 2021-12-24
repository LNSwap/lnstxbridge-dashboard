import type { NextPage } from 'next'
import Head from 'next/head'
import Swaps, {SwapProps} from "../components/swaps";
import ReverseSwaps, {ReverseSwapProps} from "../components/reverseSwaps";

const Home: NextPage = (props : any) => {
  return (
    <div>
      <Head>
        <title>Marduk admin dashboard</title>
        <meta name="description" content="Marduk admin dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-4xl mt-3 font-bold mt-3 ">
          Marduk admin dashboard
        </h1>
        <Swaps swaps={props.swaps} />
        <ReverseSwaps reverseSwaps={props.reverseSwaps}/>
      </main>

    </div>
  )
}

// fetch data from server /admin/swaps and parse data into array of SwapProps and return as props
// fetch data from server /admin/swaps/reverse and parse data into array of ReverseSwapProps and return as props

export async function getServerSideProps() : Promise<{ props: { swaps: SwapProps[], reverseSwaps: ReverseSwapProps[] } }> {
  const swaps : SwapProps[] = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'admin/swaps').then(res => res.json());
  const reverseSwaps : ReverseSwapProps[] = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'admin/swaps/reverse').then(res => res.json());
  console.log(swaps);
  console.log(reverseSwaps);
  return {
    props: {
      swaps: swaps,
      reverseSwaps: reverseSwaps
    },
  };
}

export default Home
