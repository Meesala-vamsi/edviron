import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Form,Row,Col,Table} from "react-bootstrap";
import { fetchAllTransactions } from "../store/slices/transactionSlice";
import Pagination from "../components/pagination";
import { useNavigate } from "react-router-dom";
import TransactionDetailsBySchool from "./transactionDetailsBySchool";

const TransactionOverview = () => {
  const { transactionsData } = useSelector((state) => state.transactions);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchAllTransactions());
  }, [dispatch]);

  // Filter data based on search input
  const filteredData = transactionsData?.filter((eachItem) =>
    eachItem.custom_order_id.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);

  // Paginated data
  const paginatedData = filteredData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mt-4">
      <div className="flex justify-center mb-5 gap-5">
        <button
          className="bg-black text-white"
          onClick={() => navigate("/status-check")}
        >
          Status Check
        </button>

        <button
          className="bg-black text-white"
          onClick={() => navigate("/update-status")}
        >
          Update Status
        </button>
      </div>
      <h4 className="text-center text-white bg-orange-500 py-3 rounded-md shadow">
        Transaction History
      </h4>

      {/* Search Bar */}
      <div className="mb-4 flex items-center justify-between">
        <div className="justify-content-center">
          <div className="border-2 rounded-md mt-6 pl-2 border-black">
            <input
              type="text"
              placeholder="Search by Custom Order ID"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className=" h-full outline-none md:w-64 border-black mt-3"
            />
          </div>
        </div>
        <TransactionDetailsBySchool />
      </div>

      <div className="table-responsive flex flex-col items-center">
        <Table
          bordered
          hover
          className="text-center shadow-sm bg-white"
          style={{ borderSpacing: "0 15px", borderCollapse: "separate" }}
        >
          <thead className="bg-gray-800 text-white">
            <tr>
              <th style={{ padding: "1rem" }}>Collect ID</th>
              <th style={{ padding: "1rem" }}>School ID</th>
              <th style={{ padding: "1rem" }}>Gateway</th>
              <th style={{ padding: "1rem" }}>Order Amount</th>
              <th style={{ padding: "1rem" }}>Transaction Amount</th>
              <th style={{ padding: "1rem" }}>Status</th>
              <th style={{ padding: "1rem" }}>Custom Order ID</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.length > 0 ? (
              paginatedData.map((eachItem) => (
                <tr key={eachItem._id} className="hover:bg-gray-100 shadow-sm">
                  <td style={{ padding: "1rem" }}>{eachItem.collect_id}</td>
                  <td style={{ padding: "1rem" }}>{eachItem.school_id}</td>
                  <td style={{ padding: "1rem" }}>{eachItem.gateway}</td>
                  <td style={{ padding: "1rem" }}>{eachItem.order_amount}</td>
                  <td style={{ padding: "1rem" }}>
                    {eachItem.transaction_amount}
                  </td>
                  <td style={{ padding: "1rem" }}>{eachItem.status}</td>
                  <td style={{ padding: "1rem" }}>
                    {eachItem.custom_order_id}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-3">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default TransactionOverview;
