import type {NextPage} from 'next'
import Head from 'next/head'
import Swaps, {SwapProps} from "../components/swaps";
import ReverseSwaps, {ReverseSwapProps} from "../components/reverseSwaps";
import Card from "../components/card";

const Home: NextPage = (props: any) => {
  return (
    <div>
      <Head>
        <title>Admin dashboard</title>
        <meta name="description" content="Marduk Admin dashboard"/>
        <link rel="icon" href="/marduk.png"/>
      </Head>

      <div>
        <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start">
                <button id="toggleSidebarMobile" aria-expanded="true" aria-controls="sidebar"
                        className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded">
                  <svg id="toggleSidebarMobileHamburger" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                       xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clipRule="evenodd"/>
                  </svg>
                  <svg id="toggleSidebarMobileClose" className="w-6 h-6 hidden" fill="currentColor" viewBox="0 0 20 20"
                       xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"/>
                  </svg>
                </button>
                <a href="" className="text-xl font-bold flex items-center lg:ml-2.5">
                  <img src="/marduk.png" className="h-6 mr-2"
                       alt="Windster Logo"/>
                  <span className="self-center whitespace-nowrap">Marduk admin</span>
                </a>
              </div>
              <div className="flex items-center">
                <a href="https://demo.themesberg.com/windster/pricing/"
                   className="hidden sm:inline-flex ml-5 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3">
                  <svg className="svg-inline--fa fa-gem -ml-1 mr-2 h-4 w-4" aria-hidden="true" focusable="false"
                       data-prefix="fas" data-icon="gem" role="img" xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 512 512">
                    <path fill="currentColor"
                          d="M378.7 32H133.3L256 182.7L378.7 32zM512 192l-107.4-141.3L289.6 192H512zM107.4 50.67L0 192h222.4L107.4 50.67zM244.3 474.9C247.3 478.2 251.6 480 256 480s8.653-1.828 11.67-5.062L510.6 224H1.365L244.3 474.9z"/>
                  </svg>
                  Upgrade to Pro
                </a>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex overflow-hidden bg-white pt-16">
          <aside id="sidebar"
                 className="fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
                 aria-label="Sidebar">
            <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="flex-1 px-3 bg-white divide-y space-y-1">
                  <ul className="space-y-2 pb-2">
                    <li>
                      <form action="#" method="GET" className="lg:hidden">
                        <label htmlFor="mobile-search" className="sr-only">Search</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                            </svg>
                          </div>
                          <input type="text" name="email" id="mobile-search"
                                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:ring-cyan-600 block w-full pl-10 p-2.5"
                                 placeholder="Search"/>
                        </div>
                      </form>
                    </li>
                    <li>
                      <a href="/"
                         className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group">
                        <svg className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75"
                             fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
                        </svg>
                        <span className="ml-3">Dashboard</span>
                      </a>
                    </li>
                  </ul>
                  <div className="space-y-2 pt-2">
                    <a href="https://github.com/grmkris/marduk-admin-backend" target="_blank"
                       className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2">
                      <svg
                        className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                              clipRule="evenodd"/>
                      </svg>
                      <span className="ml-3">Github</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
            <main>
              <div className="pt-6 px-4">
                <div className="w-full grid grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
                  <Card status={props.status} name="Status"/>
                  <Card status={props.lndWalletBalance} name="LND Balance"/>
                  <Card status={props.rbtcWalletBalance} name="RBTC Balance"/>
                </div>
              </div>
              <div className="pt-6 px-4">
                <div className="w-full grid grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-4">
                  <Swaps swaps={props.swaps}/>
                  <ReverseSwaps reverseSwaps={props.reverseSwaps}/>
                </div>
              </div>
            </main>

          </div>
        </div>
      </div>


    </div>
  )
}

// fetch data from server /admin/swaps and parse data into array of SwapProps and return as props
// fetch data from server /admin/swaps/reverse and parse data into array of ReverseSwapProps and return as props

export async function getServerSideProps(): Promise<{
  props: {
    swaps: SwapProps[],
    reverseSwaps: ReverseSwapProps[],
    status: string,
    lndWalletBalance: string,
    rbtcWalletBalance: string
  }
}> {
  const swaps: SwapProps[] = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'admin/swaps').then(res => res.json());
  const reverseSwaps: ReverseSwapProps[] = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'admin/swaps/reverse').then(res => res.json());
  const status: string = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'admin/status').then(res => res.text());
  const lndWalletBalance: string = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'admin/lnd/balance').then(res => res.text());
  const rbtcWalletBalance: string = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'admin/rbtc/balance').then(res => res.text());

  console.log(swaps);
  console.log(reverseSwaps);
  console.log(status);
  return {
    props: {
      swaps: swaps,
      reverseSwaps: reverseSwaps,
      status: status,
      lndWalletBalance: lndWalletBalance,
      rbtcWalletBalance: rbtcWalletBalance
    },
  };
}

export default Home
