const express = require("express");
const asyncHandler = require("express-async-handler");
const { authenticate, isValidId } = require("../middlewares");
const {
  shopCtrl: { addShop, removeShop, getAllShops },
} = require("../controllers");

// Створення роутера
const shopRouter = express.Router();

// ✅ Додати категорію
shopRouter.post("/shops", authenticate, asyncHandler(addShop));

// ❌ Видалити категорію
shopRouter.delete(
  "/categories/:id",
  authenticate,
  isValidId,
  asyncHandler(removeShop)
);

// ⏹️ Отримати список всіх категорій
shopRouter.get("/categories", authenticate, asyncHandler(getAllShops));
module.exports = shopRouter;
