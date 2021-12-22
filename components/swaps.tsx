import React, {useEffect} from 'react';

export interface SwapProps {
  id: string;

  keyIndex?: number;
  redeemScript?: string;

  fee?: number;
  routingFee?: number;
  minerFee?: number;

  pair: string;
  orderSide: number;

  status: string;
  failureReason?: string;

  preimageHash: string;
  invoice?: string;

  acceptZeroConf?: boolean;
  timeoutBlockHeight: number;
  rate?: number;
  expectedAmount?: number;
  onchainAmount?: number;
  lockupAddress: string;
  lockupTransactionId?: string;
  lockupTransactionVout?: number;
};

const Swaps = (props : any) => {

  useEffect(() => {
    console.log(props.swaps);
  }, [])

  return (
    <div>
      <h1 className="text-xl">Swaps</h1>
      <div className="App">{JSON.stringify(props.swaps)}</div>
    </div>
  );
};

export default Swaps;