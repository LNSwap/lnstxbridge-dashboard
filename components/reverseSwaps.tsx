import React, {useEffect} from 'react';
import path from "path";
import {promises as fs} from "fs";

export interface ReverseSwapProps {
  id: string;

  lockupAddress: string;

  keyIndex?: number;
  redeemScript?: string;

  claimAddress?: string

  fee: number;
  minerFee?: number;

  pair: string;
  orderSide: number;

  status: string;
  failureReason?: string;

  timeoutBlockHeight: number;

  invoice: string;

  minerFeeInvoice?: string;
  minerFeeInvoicePreimage?: string;

  minerFeeOnchainAmount?: number;

  preimageHash: string;
  preimage?: string;

  onchainAmount: number;
  transactionId?: string;
  transactionVout?: number;
}

const ReverseSwaps = (props: any) => {

  useEffect(() => {
    console.log(props.reverseSwaps);
  }, [])

  return (
    <div>
      <h1 className="text-xl">Reverse swaps</h1>
      <div className="App">{JSON.stringify(props.reverseSwaps)}</div>
    </div>
  );
};

export default ReverseSwaps;
