const { Dish } = require("../models/dish");

class DishController {
  // ✅ Додавання страви
  async addDish(req, res) {
    const { shop, title, description } = req.body;

    if (!shop || !title || !description) {
      res.status(400);
      throw new Error("Controller: Please provide all fields");
    }

    // дістаємо id із об'єкта запиту і перейменовуємо в owner
    const { _id: owner } = req.user;

    const result = await Dish.create({
      ...req.body,
      owner,
    });

    // перевірка чи додався документ у базу даних
    if (!result) {
      res.status(500);
      throw new Error("Server Error");
    }
    res.status(201).json({
      code: 201,
      message: "success",
      data: result,
    });
  }

  // ❌ Видалення hotkey
  async removeDish(req, res) {
    const { id: dishId } = req.params;
    const { _id: userId } = req.user;

    if (!dishId) {
      res.status(400);
      throw new Error("Controller: hotkeyId is required");
    }

    // знайти документ по id і перевірити чи належить він користувачу
    const result = await Dish.findOneAndDelete({
      _id: dishId,
      owner: userId,
    });

    // перевірка чи видалився документ із бази даних
    if (!result) {
      res.status(400);
      throw new Error("Controller: Category not found");
    }

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Dish deleted",
      data: result,
    });
  }

  // 🟨 Редагування страви
  async updateDish(req, res) {
    const { id: dishId } = req.params;
    const { _id: userId } = req.user;

    if (!dishId) {
      res.status(400);
      throw new Error("Controller: dishId is required");
    }

    // якщо користувач змінив одне із полів то знайти в базі і обновити
    const changedFields = { ...req.body };
    // console.log(changedFields);

    if (!changedFields) {
      res.status(400);
      throw new Error("Controller: Please provide fields for update");
    }

    const result = await Dish.findOneAndUpdate(
      {
        _id: dishId,
        owner: userId,
      },
      changedFields,
      {
        new: true,
      }
    );

    // перевірка чи оновився документ у базі даних
    if (!result) {
      res.status(500);
      throw new Error("Server Error");
    }
    res.status(200).json({
      code: 200,
      message: "success",
      data: result,
    });
  }

  // ⏹️ Отримати всі страви by user
  async getAllDishes(req, res) {
    const { _id: userId } = req.user;
    const result = await Dish.find({ owner: userId });

    if (!result) {
      res.status(400);
      throw new Error("Controller: Dish not found");
    }

    res.json({
      status: "success",
      code: 200,
      message: "Own Dishes",
      data: result,
      quantity: result.length,
    });
  }

  // ❌ видалити всі страви даного магазину
  async removeAllbyShop(req, res) {
    const { id: shopId } = req.params;
    const { _id: userId } = req.user;

    if (!shopId) {
      res.status(400);
      throw new Error("Controller: shopId is required");
    }
    // знайти страву по id магазину і перевірити чи належить вона користувачу
    const result = await Dish.deleteMany({
      category: shopId,
      owner: userId,
    });

    if (!result) {
      res.status(400);
      throw new Error("Controller: Dish not found");
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Dish deleted",
      data: result,
    });
  }
}

const dishCtrl = new DishController();
module.exports = dishCtrl;
