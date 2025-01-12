const { asyncHandler } = require("../utils/asyncHandler");
const Transactions = require("../models/transactionModel");
const CustomError = require("../utils/customError");

exports.fetchTransactionsBySchool = asyncHandler(async(req,res,next)=>{
  const {id} = req.params;
  const transactions = await Transactions.find({
    school_id: id,
  });
  if(!transactions||transactions.length === 0){
    const error = new CustomError("No transactions found.",404);
    return next(error);
  }

  res.status(200).json({
    status:"success",
    data:{
      transactions
    }
  })
});

//check status by order_id
exports.checkStatus = asyncHandler(async (req,res,next)=>{
  const {id} = req.params;
  const transaction = await Transactions.findOne({custom_order_id:id});
  if(!transaction||transaction.length===0){
    const error = new CustomError("No transactions found.",404);
    return next(error);
  }

  res.status(200).json({
    status:"success",
    data:{
      status:transaction.status
    }
  });
});

//webhook implementation ...
exports.updateStatusByWebhook = asyncHandler(async (req,res,next)=>{

});


//update status manually.......
exports.updateStatusManually = asyncHandler(async(req,res,next)=>{
  const {new_status,orderId} = req.body;
  const transaction = await Transactions.findOne({custom_order_id:orderId});
  if(!transaction || transaction.length === 0){
    const error = new CustomError("Order not found.",404);
    return next(error);
  }

  transaction.status = new_status;
  await transaction.save();
  res.status(200).json({
    status:"success",
    message:"status updated successfully."
  });
});

//Fetch all transactions.....
exports.fetchAllTransactions = asyncHandler(async(req,res,next)=>{
  const transactions = await Transactions.find({});
  if(!transactions ){
    const error = new CustomError("No transactions found.",404);
    return next(error);
  }

  res.status(200).json({
    status:"success",
    data:{
      transactions
    }
  });
});

