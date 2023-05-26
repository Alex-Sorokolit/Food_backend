const { Shop } = require("../models/shop");

class ShopController {
  // ✅ Додати магазин
  async addShop(req, res) {
    const { title } = req.body;
    if (!title) {
      res.status(400);
      throw new Error("Controller: Please provide all fields");
    }

    // дістаємо id із об'єкта запиту і перейменовуємо в owner
    const { _id: owner } = req.user;

    const result = await Shop.create({
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

  // ❌ Видалити магазин
  async removeShop(req, res) {
    const { id: categoryId } = req.params;
    const { _id: owner } = req.user;

    if (!categoryId) {
      res.status(400);
      throw new Error("Controller: shopId is required");
    }

    // знайти магазин по id і перевірити чи належить він користувачу
    const result = await Shop.findOneAndDelete({
      _id: categoryId,
      owner,
    });

    // перевірка чи видалився документ із бази даних
    if (!result) {
      res.status(400);
      throw new Error("Controller: Shop not found");
    }

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Shop deleted",
      data: result,
    });
  }

  // ⏹️ Отримати список всіх магазинів
  async getAllShops(req, res) {
    const { _id: userId } = req.user;

    const result = await Shop.find({ owner: userId });

    // Перевірка чи знайдено документи в базі даних
    if (!result) {
      res.status(400);
      throw new Error("Controller: Shop not found");
    }

    res.json({
      status: "success",
      code: 200,
      message: "Own Shops",
      data: result,
      quantity: result.length,
    });
  }
}

const shopCtrl = new ShopController();
module.exports = shopCtrl;
