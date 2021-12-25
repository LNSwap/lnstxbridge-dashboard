import React, {useEffect} from 'react';
import path from "path";
import {promises as fs} from "fs";
import DataTable from "react-data-table-component";
import {SwapProps} from "./swaps";

export interface ReverseSwapProps {
  id: string;
  lockupAddress: string;
  keyIndex: number;
  redeemScript: string;
  claimAddress: string
  fee: number;
  minerFee: number;
  pair: string;
  orderSide: number;
  status: string;
  failureReason: string;
  timeoutBlockHeight: number;
  invoice: string;
  minerFeeInvoice: string;
  minerFeeInvoicePreimage: string;
  minerFeeOnchainAmount: number;
  preimageHash: string;
  preimage: string;
  onchainAmount: number;
  transactionId: string;
  transactionVout: number;
}

const ReverseSwaps = (props: any) => {

  useEffect(() => {
    console.log(props.reverseSwaps);
  }, [])

  const columns = [
    {
      name: 'Id',
      selector: (row: ReverseSwapProps) => row.id,
      maxWidth: '30px',
      sortable: true,
    },
    {
      name: 'Fee',
      selector: (row: ReverseSwapProps) => row.fee,
      maxWidth: '30px',
      sortable: true,
    },
    {
      name: 'Pair',
      selector: (row: ReverseSwapProps) => row.pair,
      sortable: true,
      maxWidth: '30px',
    },
    {
      name: 'Onchain Amount',
      selector: (row: ReverseSwapProps ) => row.onchainAmount,
      maxWidth: '150px',
      sortable: true,
    },
    {
      name: 'Transaction Id',
      selector: (row: ReverseSwapProps) => row.transactionId,
      maxWidth: '150px',
      sortable: true,
    },
    {
      name: 'Failure Reason',
      selector: (row: ReverseSwapProps) => row.failureReason,
      maxWidth: '150px',
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row: ReverseSwapProps) => row.status,
      maxWidth: '150px',
      sortable: true,
    },
    {
      name: 'Timeout Block Height',
      selector: (row: ReverseSwapProps) => row.timeoutBlockHeight,
      maxWidth: '150px',
      sortable: true,
    }
  ];

  const conditionalRowStyles = [
    {
      when: (row:ReverseSwapProps) => row.status.includes('settled'),
      style: {
        backgroundColor: '#2ea65a',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    }
  ];


  return (
  <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
    <div className="flex items-center justify-between mb-4">
      <div className="flex-shrink-0">
        <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">Reverse Swaps</span>
        <h3 className="text-base font-normal text-gray-500">Recent reverse swaps</h3>
      </div>
    </div>
    <DataTable dense pagination columns={columns} data={props.reverseSwaps} highlightOnHover conditionalRowStyles={conditionalRowStyles}/>
  </div>
  );

};

export default ReverseSwaps;