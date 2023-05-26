const { model, Schema } = require("mongoose");
const Joi = require("joi");

// mongoos схема перевіряє дані які зберігаються в базу даних
const dishSchema = Schema(
  {
    shop: { type: Schema.Types.ObjectId, ref: "shop", required: true }, // тут буде зберігатися id магазину, ref це колекція

    title: {
      type: String,
      require: [true, "DB: shortcut is required"],
    },

    description: {
      type: String,
      require: [true, "DB: description is required"],
    },

    thumb: {
      type: String,
    },

    imageId: {
      type: String,
    },

    owner: { type: Schema.Types.ObjectId, ref: "user", required: true }, // тут буде зберігатися id користувача який додав рецепт у базу, ref це колекція
  },
  { versionKey: false, timestamps: true }
);

// валідація Joy перевіряє тіло запиту
const dishJoiSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Joi: Schortcut is required",
    "string.empty": "Joi: Schortcut cannot be empty",
  }),
  description: Joi.string().required().messages({
    "any.required": "Joi: Description is required",
    "string.empty": "Joi: Description cannot be empty",
  }),
}).options({ abortEarly: false, stripUnknown: true });

const Dish = model("dish", dishSchema); //перший аргумент це назва колекції в однині, другий аргумент це схема

const schemas = {
  dishJoiSchema,
};

module.exports = {
  Dish,
  schemas,
};
