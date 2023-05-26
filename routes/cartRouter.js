const express = require("express");
const asyncHandler = require("express-async-handler");
const { authenticate } = require("../middlewares");
const {
  cartCtrl: { addToCart, getCart, deleteFromCart },
} = require("../controllers");

const cartRouter = express.Router();

// Add to cart
cartRouter.post("/cart", authenticate, asyncHandler(addToCart));

// get all in cart
cartRouter.get("/cart", authenticate, asyncHandler(getCart));

// remove from cart
cartRouter.delete("/cart/:id", authenticate, asyncHandler(deleteFromCart));

module.exports = cartRouter;
