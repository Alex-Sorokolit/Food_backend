const { model, Schema } = require("mongoose");
const Joi = require("joi");

// mongoos схема перевіряє дані які зберігаються в базу даних
const dishSchema = Schema(
  {
    category: { type: Schema.Types.ObjectId, ref: "category", required: true }, // тут буде зберігатися id категорії, ref це колекція

    title: {
      type: String,
      require: [true, "DB: shortcut is required"],
    },

    description: {
      type: String,
      require: [true, "DB: description is required"],
    },

    owner: { type: Schema.Types.ObjectId, ref: "user", required: true }, // тут буде зберігатися id користувача який додав контакт у базу, ref це колекція
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

const Dish = model("Dish", dishSchema);

const schemas = {
  dishJoiSchema,
};

module.exports = {
  Dish,
  schemas,
};
