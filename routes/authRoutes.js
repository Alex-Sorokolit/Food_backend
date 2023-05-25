const express = require("express");
const { schemas } = require("../models/user");
const { ctrlWrapper } = require("../helpers");

const {
  authCtrl: {
    register,
    login,
    getCurrent,
    logout,
    getCurrentUser,
    updateUser,
    updateAvatar,
    removeUser,
  },
} = require("../controllers");

const authRouter = express.Router();

const { validateBody, authenticate, uploadCloud } = require("../middlewares");

const cloudOptions = {
  fieldname: "avatar",
  destFolder: "Delivery/avatars",
  transformation: {
    width: 100,
    height: 100,
    crop: "thumb",
    gravity: "auto",
    zoom: 0.75,
  },
};

// Registration  (signup)
authRouter.post(
  "/auth/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(register)
);

// LogIn (signin)
authRouter.post(
  "/auth/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(login)
);

// Get current user
authRouter.get("/auth/current", authenticate, ctrlWrapper(getCurrent));

// Get info about user
authRouter.get("/auth/user/info", authenticate, ctrlWrapper(getCurrentUser));

// Update user fields
authRouter.put(
  "/auth/user/update",
  authenticate,
  validateBody(schemas.updateUserSchema),
  ctrlWrapper(updateUser)
);

// LogOut
authRouter.post("/auth/logout", authenticate, ctrlWrapper(logout));

// Update users avatar
authRouter.patch(
  "/auth/user/avatar",
  authenticate,
  uploadCloud(cloudOptions),
  ctrlWrapper(updateAvatar)
);

// Delete User
authRouter.delete("/auth/user/remove", authenticate, ctrlWrapper(removeUser));

module.exports = authRouter;
