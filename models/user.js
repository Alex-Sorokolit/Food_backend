const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for user"],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
    },
    imageId: {
      type: String,
    },
    cart: [
      {
        type: Schema.Types.ObjectId,
        ref: "dish",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .pattern(emailRegexp)
    .email({
      minDomainSegments: 1,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .required()
    .messages({
      "string.pattern.base": `"email" should be example@mail.com`,
    }),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .email({
      minDomainSegments: 1,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .required(),
  password: Joi.string().min(6).required(),
});

const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string()
    .pattern(emailRegexp)
    .email({
      minDomainSegments: 1,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .messages({
      "string.pattern.base": `"email" should be example@mail.com`,
    }),
  password: Joi.string().min(6),
});

const updateCartSchema = Joi.object({
  cart: Joi.object({
    dish: Joi.object(),
  }),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateUserSchema,
  updateCartSchema,
};

const User = model("user", userSchema); //перший аргумент це назва колекції в однині, другий аргумент це схема

module.exports = { User, schemas };
