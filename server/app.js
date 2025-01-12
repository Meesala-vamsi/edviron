const express = require("express");
const globalErrorController = require("./controllers/globalErrorHandler");
const CustomError = require("./utils/customError");
const transactionRoutes = require("./routes/transactionRoutes");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use("/transactions",transactionRoutes);
app.all("*", (req, res, next) => {
  const error = new CustomError(`Invalid end point ${req.originalUrl}`, 404);
  next(error);
});

app.use(globalErrorController);

module.exports = app;
