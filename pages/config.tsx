import type {NextPage} from 'next'
import Head from 'next/head'
import Swaps, {SwapProps} from "../components/swaps";
import ReverseSwaps, {ReverseSwapProps} from "../components/reverseSwaps";
import Card from "../components/card";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import Form from "@rjsf/material-ui";
import Button from '@mui/material/Button';
import { JSONSchema7 } from "json-schema";
import Link from 'next/link'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Config: NextPage = () => {

    const schema:JSONSchema7 = {
        "title": "Bridge Configuration",
        // "description": "View/Edit configuration",
        "type": "object",
         "properties": {
              "prepayMinerFee": {
              "type": "boolean"
          },
              "aggregatorUrl": {
              "type": "string"
          },
              "providerUrl": {
              "type": "string"
          },
           "notification": {
            "type": "object",
            "properties": {
                "token": {
                    "type": "string"
                    },
                "channel": {
                    "type": "string"
                    },
                "prefix": {
                    "type": "string"
                    },
                "interval": {
                    "type": "number"
                    },
                "otpsecretpath": {
                    "type": "string"
                }
            }
          },
            "balancer": {
                "type": "object",
                "properties": {
                    "apiUri": {
                        "type": "string"
                    },
                    "apiKey": {
                        "type": "string"
                    },
                    "secretKey": {
                        "type": "string"
                    },
                    "passphrase": {
                        "type": "string"
                    },
                    "tradePassword": {
                        "type": "string"
                    },
                    "minSTX": {
                        "type": "number"
                    },
                    "minBTC": {
                        "type": "number"
                    },
                    "overshootPercentage": {
                        "type": "number"
                    },
                    "autoBalance": {
                        "type": "boolean"
                    }
                }
            },         
            "dashboard": {
                "type": "object",
                "properties": {
                    "username": {
                        "type": "string"
                    },
                    "password": {
                        "type": "string"
                    }
                }
            },
            "pairs": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "base": {
                            "type": "string"
                        },
                        "quote": {
                            "type": "string"
                        },
                        "fee": {
                            "type": "number"
                        },
                        "timeoutDelta": {
                            "type": "number"
                        }
                    }
                }
            },
            "currencies": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "symbol": {
                            "type": "string"
                        },
                        "network": {
                            "type": "string"
                        },
                        "minWalletBalance": {
                            "type": "number"
                        },
                        "minChannelBalance": {
                            "type": "number"
                        },
                        "maxSwapAmount": {
                            "type": "number"
                        },
                        "minSwapAmount": {
                            "type": "number"
                        },
                        "maxZeroConfAmount": {
                            "type": "number"
                        },
                        "chain": {
                            "type": "object",
                            "properties": {
                                "host": {
                                    "type": "string"
                                },
                                "port": {
                                    "type": "number"
                                },
                                "cookie": {
                                    "type": "string"
                                },
                                "rpcuser": {
                                    "type": "string"
                                },
                                "rpcpass": {
                                    "type": "string"
                                }
                            }
                        },
                        "lnd": {
                            "type": "object",
                            "properties": {
                                "host": {
                                    "type": "string"
                                },
                                "port": {
                                    "type": "number"
                                },
                                "certpath": {
                                    "type": "string"
                                },
                                "macaroonpath": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            },
            "stacks": {
                "type": "object",
                "properties": {
                    "providerEndpoint": {
                        "type": "string"
                    },
                    "stxSwapAddress": {
                        "type": "string"
                    },
                    "sip10SwapAddress": {
                        "type": "string"
                    },
                    "tokens": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "symbol": {
                                    "type": "string"
                                },
                                "maxSwapAmount": {
                                    "type": "number"
                                },
                                "minSwapAmount": {
                                    "type": "number"
                                },
                                "contractAddress": {
                                    "type": "string"
                                },
                                "decimals": {
                                    "type": "number"
                                }
                            }
                        }
                    }
                }
            },
            "configpath": {
                "type": "string"
            }
         }
    };

    const uiSchema = {
        classNames: "m-4"
    };

    const [configData, setConfigData] = useState<{}>();

    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [apiurl, setApiurl] = useState(process.env.NEXT_PUBLIC_BACKEND_URL);

    // popup
    const [open, setOpen] = useState(false);
    const [seed, setSeed] = useState('');
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    useEffect(() => {
        const baseurl = window.location.href.split(':')[1].split('/')[2];
        setApiurl(process.env.NEXT_PUBLIC_BACKEND_URL || `http://${baseurl}:9008`);
        console.log('backend IP: ', baseurl, process.env.NEXT_PUBLIC_BACKEND_URL || `http://${baseurl}:9008`, apiurl);
        if (loggedIn) {
          getData().then(data => {
            setConfigData(data);
            setIsLoading(false);
          });
        } else {
            // check if localstorage has username/password
            if(localStorage.getItem('username') && localStorage.getItem('password')) {
                setUsername(localStorage.getItem('username')!);
                setPassword(localStorage.getItem('password')!);
                setLoggedIn(true);
            }
        }
      }, [username, password, loggedIn])
    
      const getData = async () => {
          const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
          const headers = {headers: {'Authorization' : auth}};
          const configData: any = await fetch(apiurl + '/api/admin/getconfiguration', headers ).then(res => res.json());
          return configData;
      };

      const onSubmit = async ({formData}:{formData:any}) => {
          const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
          const headers = {'Authorization' : auth, 'Content-Type': 'application/json',};
          const configResult: {status:string, result: string} = await fetch(apiurl + '/api/admin/saveconfiguration', {
            method: 'POST',
            headers,
            body: JSON.stringify({config: formData})
          }).then(res => res.json());
          console.log("configResult: ", configResult);
      }

      const restartApp = async () => {
        const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
        const headers = {'Authorization' : auth, 'Content-Type': 'application/json',};
        const result: {status:string, result: string} = await fetch(apiurl + '/api/admin/restartapp', {
          method: 'POST',
          headers,
          body: JSON.stringify({restart: "now"})
        }).then(res => res.json());
        console.log("restartApp: ", result);
      }

      const showSeed = async () => {
        const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
        const headers = {'Authorization' : auth, 'Content-Type': 'application/json',};
        const result: string = await fetch(apiurl + '/api/admin/getmnemonic', {
          method: 'GET',
          headers,
        //   body: JSON.stringify({restart: "now"})
        }).then(res => res.json());
        // console.log("showSeed: ", result);
        setSeed(result);
        handleClickOpen();
      }
      
      const toggleSidebarMobile = () => {
        document.getElementById('sidebar')!.classList.toggle('hidden');
        document.getElementById('toggleSidebarMobileHamburger')!.classList.toggle('hidden');
        document.getElementById('toggleSidebarMobileClose')!.classList.toggle('hidden');
      }

    if (loggedIn == false) {
        return (
          <div className="m-auto mt-40 max-w-2xl">
              <div className="mb-6">
                <h1 style={{textAlign: 'center', fontSize: 'x-large',}}>LN-STX Bridge Admin Dashboard</h1>
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Username</label>
                <input type="email" id="email"
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="username" required
                onChange={event => {
                  setUsername(event.target.value);
                }}/>
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Password</label>
                <input type="password" id="password"
                        placeholder="password"
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       required onChange={event => {setPassword(event.target.value)}}/>
              </div>
              <button type="submit" onClick={() => {setLoggedIn(true)}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Login
              </button>
          </div>
        )
    }

    return (
        <div>
        <Head>
        <title>Admin dashboard</title>
        <meta name="description" content="LN-STX Bridge Admin dashboard"/>
        <link rel="icon" href="/dashboard.png"/>
        </Head>

        <div>
        <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-start">
                <button id="toggleSidebarMobile" aria-expanded="true" aria-controls="sidebar" onClick={() => {toggleSidebarMobile()}}
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
                    <Image src="/dashboard.png" className="h-6 mr-2"
                    width={32} height={32}
                        alt="Windster Logo"/>
                    <span className="self-center whitespace-nowrap ml-2">LNSTX Bridge Admin Dashboard</span>
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
                    {/* <li>
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
                    </li> */}
                    <li>
                        <Link href="/">
                            <a className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group">
                                <svg className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75"
                                    fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
                                </svg>
                                <span className="ml-3">Dashboard</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <a href="./config"
                        className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="ml-3">Config</span>
                        </a>
                    </li>
                    </ul>
                    <div className="space-y-2 pt-2">
                    <a href="https://github.com/pseudozach/lnstxbridge-dashboard"
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
                <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 gap-1" style={{display: 'flex', flexDirection: 'column',}}>
                    <Form schema={schema} formData={configData} uiSchema={uiSchema} onSubmit={onSubmit}/>
                    <div style={{marginTop: '16px',}}>
                        <Button variant="contained" onClick={() => {restartApp()}} color="error" sx={{display: 'block', margin: 'auto', marginBottom: 2, width: '30%',}}>Restart App</Button>
                        <Button variant="contained" onClick={() => {showSeed()}} color="error" sx={{display: 'block', margin: 'auto', marginBottom: 2, width: '30%',}}>Show Wallet Seed</Button>
                    </div>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                        {"Bridge Client Wallet Private Key"}
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This is the mnemonic seed for the Stacks signer account. <br/>Keep this safe, do NOT share with anyone.<br/>
                            <b>{seed}</b>
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        {/* <Button onClick={handleClose}>Disagree</Button> */}
                        <Button onClick={handleClose} autoFocus>
                            OK
                        </Button>
                        </DialogActions>
                    </Dialog>
                    {/* <div
                    className="flex flex-row p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <div className="w-full grid columns-2">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Auto Balance</h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400 break-words"><b>min STX:</b> {dashboardData.status.minSTX} STX</p>
                        <p className="font-normal text-gray-700 dark:text-gray-400 break-words"><b>min BTC:</b>  {dashboardData.status.minBTC} sats</p>
                        <p className="font-normal text-gray-700 dark:text-gray-400 break-words"><b>Overshoot %:</b>  {dashboardData.status.overshootPct}</p>
                        <p className="font-normal text-gray-700 dark:text-gray-400 break-words"><b>Auto Balance:</b>  {dashboardData.status.autoBalance.toString()}</p>
                        </div>
                        <div className="w-full grid columns-2 gap-1">
                        {!dashboardData.status.autoBalance && (
                            <>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Manual Balance</h5>

                            <label className="block text-gray-700 text-sm font-bold mt-2" htmlFor="pairId">
                            Pair ID (Sell/Buy)
                            </label>
                            <div className="inline-block relative w-64">
                            <select className="block appearance-none w-full bg-white border hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" id="pairId"   
                            onChange={e => {
                                setPairId(e.target.value);
                            }}>
                                <option>BTC/STX</option>
                                <option>STX/BTC</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                            </div>
                            <label className="block text-gray-700 text-sm font-bold mt-2" htmlFor="amount">
                            Buy Amount
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="amount" type="number" placeholder="10" onChange={event => {setAmount(Number(event.target.value))}}/>

                            <p className="font-normal text-gray-700 dark:text-gray-400 break-words"><b>Status:</b>  {balanceStatus}</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400 break-words"><b>Result:</b>  {balanceResult}</p>
                            <button type="submit"  data-tooltip-target="tooltip-default"  onClick={() => {triggerBalance()}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Trigger Balance
                            </button>
                            </>
                        )}
                        </div>
                    </div> */}

                    {/* <div className="w-full grid grid-cols-3 gap-4">
                    <Card status={dashboardData.lndWalletBalance} name="Lightning"/>
                    <Card status={dashboardData.lndOnchainBalance} name="Onchain"/>
                    {
                        dashboardData.stacksWalletBalance ?
                        dashboardData.stacksWalletBalance.map(item => {
                            return <Card key={item.walletName} status={Number(item.value)/10**6} name={item.walletName} address={item.address}/>
                        })
                        : null
                    }
                    <Card status={dashboardData.exchangeBTCBalance} name="Exchange BTC"/>
                    <Card status={dashboardData.exchangeSTXBalance} name="Exchange STX"/>
                    </div> */}

                </div>
                </div>

                {/* <div className="pt-6 px-4">
                <div className="w-full grid grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-4">
                    <Swaps swaps={dashboardData.swaps}/>
                    <ReverseSwaps reverseSwaps={dashboardData.reverseSwaps}/>
                </div>
                </div> */}

            </main>

            </div>
        </div>
        </div>


    </div>
    )

}

export default Config