const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const logger = require("morgan");
const { authRouter, shopRouter, dishRouter } = require("./routes");
// var multer = require("multer");
// var upload = multer();
require("colors");
require("dotenv").config();

// створення сервера
const app = express();

// middelwares ______________________________
app.use(logger("dev"));
// for parsing application/xwww-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// for parsing multipart/form-data
// app.use(upload.array());
// for parsing application/json
app.use(express.json());

// Дозволяємо крос баузерні запити
app.use(cors());

// set routes ________________________________
app.use("/api/v1", authRouter);
app.use("/api/v1", shopRouter);
app.use("/api/v1", dishRouter);

// Catch Errors ______________________________
// обробка помилки 404
app.use("*", (req, res, next) => {
  res.status(404).json({
    code: 404,
    message: "Not found",
  });
});

// відловлювач всіх не передбачених помилок
app.use((error, req, res, next) => {
  if (error.status) {
    const statusCode = error.status;
    res
      .status(statusCode)
      .json({ code: res.statusCode, message: error.message });
    return;
  }
  const statusCode = res.statusCode || 500;
  res.status(statusCode).json({ code: res.statusCode, message: error.message });
});

// Підключаємось до бази даних
connectDb();
// отримуємо порт і запускаємо сервер
const { PORT = 5000 } = process.env;
app.listen(PORT, () => {
  console.log(
    `server is running on port: , ${process.env.PORT}`.white.bgCyan.bold
  );
});
