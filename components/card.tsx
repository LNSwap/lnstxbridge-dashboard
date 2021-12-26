import React, {useEffect} from 'react';
import DataTable from 'react-data-table-component';

const Card = (props : any) => {

  useEffect(() => {
    console.log(props.status);
  }, [])

  return (
    <div
       className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.name}</h5>
      <p className="font-normal text-gray-700 dark:text-gray-400 break-words">{props.status}</p>
    </div>
  );
};

export default Card;