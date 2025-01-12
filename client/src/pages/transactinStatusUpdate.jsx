import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStatus } from "../store/slices/transactionSlice";
import { toast } from "react-toastify";

const TransactionStatusUpdate = () => {
  const [details, setDetails] = useState({
    orderId: "",
    new_status: "Pending", // Default value for the dropdown
  });

  const { orderData } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();

  const onChangeOrderId = (event) => {
    const { id, value } = event.target;
    setDetails({
      ...details,
      [id]: value,
    });
  };

  const onSubmitOrderId = (event) => {
    event.preventDefault();
    dispatch(updateStatus(details)).then((response) => {
      if(response?.payload?.status==="success"){
        toast.success(response?.payload?.message)
      }
    });
    setDetails({
      orderId: "",
      new_status: "Pending",
    });
  };

  return (
    <div className="flex justify-center">
      <div className="flex border-2 p-4 border-black items-center md:w-[50vw]">
        <div className="w-full">
          <div className="bg-black p-5 w-full mb-4">
            <h1 className="text-white text-[40px]">
              Transaction Status Update
            </h1>
          </div>
          <form
            onSubmit={onSubmitOrderId}
            className="flex flex-col items-start gap-3"
          >
            {/* Order ID Input */}
            <input
              type="text"
              id="orderId"
              placeholder="Enter Order ID"
              value={details.orderId}
              onChange={onChangeOrderId}
              className="p-2 border rounded focus:outline-none w-full focus:ring-2 focus:ring-blue-500"
            />

            {/* Dropdown for Status */}
            <select
              id="new_status"
              value={details.new_status}
              onChange={onChangeOrderId}
              className="p-2 border rounded focus:outline-none w-full focus:ring-2 focus:ring-blue-500"
            >
              <option value="SUCCESS">Success</option>
              <option value="PENDING">Pending</option>
              <option value="REJECTED">Rejected</option>
            </select>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-52 bg-black text-white py-2 rounded hover:bg-gray-800"
            >
              Update Status
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransactionStatusUpdate;
