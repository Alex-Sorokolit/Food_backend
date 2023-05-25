const express = require("express");
const asyncHandler = require("express-async-handler");
const { authenticate, isValidId } = require("../middlewares");
const {
  dishCtrl: { addDish, removeDish, updateDish, getAllDishes, removeAllbyShop },
} = require("../controllers");

// створення роутера
const dishRouter = express.Router();

// ✅ Додавання страви
dishRouter.post("/dish", authenticate, asyncHandler(addDish));

// ❌ Видалення страви by id
dishRouter.delete(
  "/dish/:id",
  authenticate,
  isValidId,
  asyncHandler(removeDish)
);

// 🟨 Редагування страви by id
dishRouter.put("/dish/:id", authenticate, isValidId, asyncHandler(updateDish));

// ⏹️ Отримати всі страви by user
dishRouter.get("/dish", authenticate, asyncHandler(getAllDishes));

// ❌ видалити всі страви даного магазину
dishRouter.delete(
  "/dish/shop/:id",
  authenticate,
  isValidId,
  asyncHandler(removeAllbyShop)
);

module.exports = dishRouter;
