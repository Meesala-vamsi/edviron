import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading:true,
  transactionsData:null,
  orderData : null
}


export const fetchAllTransactions = createAsyncThunk("/fetchAllTransactions",
  async(id,{rejectWithValue})=>{
    try{
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/transactions/allTransactions`
      );
      return response?.data;
    }catch(error){
      return rejectWithValue(error?.response?.data);
    }
  }
)

export const fetchTransactionsBySchool = createAsyncThunk(
  "/fetchTransactionsBySchool",
  async(id,{rejectWithValue})=>{
    try{
      const response = await axios.get(
      `${import.meta.env.VITE_URL}/transactions/${id}`
    );
    return response?.data;
    }
  catch(error){
    return rejectWithValue(error?.response?.data);
  }
});

export const getDataByOrderId = createAsyncThunk("/getDataByOrderId",
  async(id,{rejectWithValue})=>{
    try{
      const response = await axios.get(
      `${import.meta.env.VITE_URL}/transactions/order/${id}`
    );
    return response?.data;
    }
  catch(error){
    return rejectWithValue(error?.response?.data);
  }
});

export const updateStatus = createAsyncThunk(
  "/updateStatus",
  async (details, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/transactions/updateStatus`,{
          orderId:details.orderId,
          new_status:details.new_status
        }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const transactionSlice = createSlice({
  name:"transactions",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase(fetchAllTransactions.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactionsData = action?.payload?.data?.transactions;
      })
      .addCase(fetchAllTransactions.rejected, (state) => {
        state.isLoading = false;
        state.transactionsData = null;
      })
      .addCase(getDataByOrderId.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getDataByOrderId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderData = action?.payload?.data;
      })
      .addCase(getDataByOrderId.rejected, (state) => {
        state.isLoading = false;
        state.orderData = null;
      })
      .addCase(fetchTransactionsBySchool.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchTransactionsBySchool.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactionsData = action?.payload?.data?.transactions;
      })
      .addCase(fetchTransactionsBySchool.rejected, (state) => {
        state.isLoading = false;
        state.transactionsData = null;
      });

  }
});

export default transactionSlice.reducer