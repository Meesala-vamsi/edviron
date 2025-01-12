import { useState } from "react";
import axios from "axios";
import { Table, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionsBySchool } from "../store/slices/transactionSlice";

const TransactionDetailsBySchool = () => {
  const [schoolId, setSchoolId] = useState("");
  const {transactionsData} = useSelector((state)=>state.transactions);
  const dispatch = useDispatch();

  const handleFetch = async () => {
    dispatch(fetchTransactionsBySchool(schoolId));
  };

  return (
    <div
      className="container mt-3"
      style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}
    >
      <Form.Group>
        <input
          type="text" 
          placeholder="Enter School ID"
          onChange={(e) => setSchoolId(e.target.value)}
          className="border-2 border-black px-2 py-1 rounded-md w-56"
        />
        <button className="bg-black py-2 text-white mt-2 ml-4" onClick={handleFetch}>
          Fetch Transactions
        </button>
      </Form.Group>
    </div>
  );
};

export default TransactionDetailsBySchool;
