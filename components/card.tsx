import React, {useEffect} from 'react';
import DataTable from 'react-data-table-component';

const Card = (props: any) => {

  useEffect(() => {
    // console.log(props.status);
  }, [])

  return (
    <div
      className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{props.name}</h5>
      <p className="font-normal text-gray-700 dark:text-gray-400 break-words"><b>Balance:</b> {props.status}</p>
      {props.before && <p className="font-thin text-gray-700 dark:text-gray-400 break-words"><b>24h ago:</b> {props.before}</p>}
      {props.address &&
        <a
          className="inline-flex items-center h-8 px-4 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
          href={"https://explorer.stacks.co/address/" + props.address}
          target="_blank" rel="noreferrer">Explorer</a>
      }
    </div>
  );
};

export default Card;