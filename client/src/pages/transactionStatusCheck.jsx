import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDataByOrderId } from '../store/slices/transactionSlice';

const TransactionStatusCheck = () => {
  const [orderId,setOrderId] = useState("");
  const {orderData} = useSelector((state)=>state.transactions)
  const dispatch = useDispatch();

  const onChangeOrderId=(event)=>{
    setOrderId(event.target.value);
  }
  const onSubmitOrderId = (event)=>{
    event.preventDefault();
    dispatch(getDataByOrderId(orderId))
  };
  return (
    <div className='flex justify-center'>
      <div className="flex border-2 p-4 border-black items-center md:w-[50vw]">
        <div className='w-full'>
          <div className="bg-black p-5 w-full mb-4">
            <h1 className="text-white text-[40px]">Transaction Status Check</h1>
          </div>
          <form onSubmit={onSubmitOrderId} className="flex flex-col items-start gap-3">
            <input
              type="text"
              placeholder="Enter order Id"
              value={orderId}
              onChange={onChangeOrderId}
              className="p-2 border rounded focus:outline-none w-full focus:ring-2 focus:ring-blue-500"
            />
            <p className='font-bold'>Order Status: {orderData?.status}</p>
            <button type="submit" className="w-52 bg-black text-white">
              Check Status
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TransactionStatusCheck