const { model, Schema } = require("mongoose");
const Joi = require("joi");

// mongoos схема перевіряє дані які зберігаються в базу даних
const shopSchema = Schema(
  {
    title: {
      type: String,
      require: [true, "DB: title is required"],
    },
    owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  { versionKey: false, timestamps: true }
);

// валідація Joy перевіряє тіло запиту
const shopJoiSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Joi: Title is required",
    "string.empty": "Joi: Title cannot be empty",
  }),
}).options({ abortEarly: false, stripUnknown: true });

const Shop = model("Shop", shopSchema);

const schemas = {
  shopJoiSchema,
};

module.exports = {
  Shop,
  schemas,
};
