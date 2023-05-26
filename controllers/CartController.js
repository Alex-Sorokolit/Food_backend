const { Dish } = require("../models/dish");
const { User } = require("../models/user");

class CartController {
  // Додавання в корзину
  async addToCart(req, res) {
    const { _id: userId } = req.user;
    const { _id: dishId } = req.body;
    if (!dishId) {
      return res.status(422).json({
        code: 422,
        message: "Missing dish ID in request body",
      });
    }

    const dish = await Dish.findById(dishId);
    if (!dish) {
      return res.status(404).json({
        code: 404,
        message: "Dish not found",
      });
    }

    // Оновлення списку товарів у корзині
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { cart: dishId } },
      { new: true, upsert: true }
    );
    // Відправлення відповіді з останнім доданим товаром
    res.status(201).json({
      code: 201,
      message: "success",
      // Виводимо останній доданий товар
      data: dish,
    });
  }

  // Отримати всі товари в корзині
  async getCart(req, res) {
    const { _id: userId } = req.user;

    const user = await User.findById(userId).populate({
      path: "cart",
      model: "dish",
    });

    const result = user.favorites;

    if (!result) {
      res.json({
        message: "Cart is empty",
      });
    }

    res.status(200).json({
      code: 200,
      message: "success",
      data: result,
      quantity: result.length,
    });
  }

  // Видалення товару із корзини
  async deleteFromCart(req, res) {
    const { _id: userId } = req.user;
    const { id: dishId } = req.params;
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { cart: dishId } },
      { new: true }
    ).populate("cart");
    if (!dishId) {
      res.json({
        message: "Cart is empty",
      });
    }
    res.status(200).json({
      code: 200,
      message: "The product has been removed",
      data: updateUser.favorites,
    });
  }
}

const cartCtrl = new CartController();

module.exports = cartCtrl;
