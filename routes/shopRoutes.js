const express = require("express");
const asyncHandler = require("express-async-handler");
const { authenticate, isValidId } = require("../middlewares");
const {
  shopCtrl: { addShop, removeShop, getAllUserShops, getAllShops },
} = require("../controllers");

// Створення роутера
const shopRouter = express.Router();

// ✅ Додати магазин
shopRouter.post("/shops", authenticate, asyncHandler(addShop));

// ❌ Видалити магазин
shopRouter.delete(
  "/shops/:id",
  authenticate,
  isValidId,
  asyncHandler(removeShop)
);

// ⏹️ Отримати список всіх магазинів користувача
shopRouter.get("/shops", authenticate, asyncHandler(getAllUserShops));
module.exports = shopRouter;

// ⏹️ Отримати список всіх магазинів
shopRouter.get("/all-shops", authenticate, asyncHandler(getAllShops));
module.exports = shopRouter;
