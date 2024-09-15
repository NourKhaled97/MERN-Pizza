const express = require("express");
const Pizza = require("../models/pizzaModel");

const router = express.Router();

router
  //
  .get("/getallpizzas", async (req, res) => {
    try {
      const pizzas = await Pizza.find({});
      res.send(pizzas);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  })
  .post("/addpizza", async (req, res) => {
    const pizza = req.body.pizza;

    try {
      const newPizza = new Pizza({
        name: pizza.name,
        image: pizza.image,
        varients: ["small", "medium", "large"],
        description: pizza.description,
        category: pizza.category,
        prices: [pizza.prices],
      });

      await newPizza.save();
      res.send("New pizza added successfully");
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  })
  .put("/editpizza", async (req, res) => {
    const editedPizza = req.body.pizza;

    try {
      const pizza = await Pizza.findOne({ _id: editedPizza._id });

      pizza.name = editedPizza.name;
      pizza.image = editedPizza.image;
      pizza.description = editedPizza.description;
      pizza.category = editedPizza.category;
      pizza.prices = [editedPizza.prices];

      await pizza.save();
      res.send("Pizza edited successfully");
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  })
  .delete("/deletepizza", async (req, res) => {
    const { pizzaId } = req.query;

    try {
      await Pizza.findOneAndDelete({ _id: pizzaId });

      res.send("Pizza deleted successfully");
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });

module.exports = router;
