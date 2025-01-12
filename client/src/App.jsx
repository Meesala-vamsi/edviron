import React from 'react'
import "react-toastify/dist/ReactToastify.css";
import "./App.css"
import { ToastContainer } from "react-toastify";
import { Route, Routes } from 'react-router-dom'
import TransactionOverview from './pages/transactionOverview'
import TransactionStatusCheck from './pages/transactionStatusCheck'
import TransactionStatusUpdate from './pages/transactinStatusUpdate'

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<TransactionOverview />} />
        <Route path="/status-check" element={<TransactionStatusCheck />} />
        <Route path="/update-status" element={<TransactionStatusUpdate />} />
      </Routes>
    </>
  );
}

export default App