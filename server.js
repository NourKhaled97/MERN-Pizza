// entry point of BE
const express = require("express");
const db = require("./db");
const Pizza = require("./models/pizzaModel");
const PizzasRoute = require("./routes/pizzasRoute");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server working ");
});

// get pizzas
// app.get("/getpizzas", async (req, res) => {
//   try {
//     const result = await Pizza.find().exec();
//     res.send(result);
//   } catch (error) {
//     console.error(error);
//   }
// });
app.use("/api/pizzas", PizzasRoute);

if (process.env.MODE_ENV === "production") {
  // tell the server what is the entry point of client (Frontend)
  app.use("/", express.static("client/build"));
}

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port}`);
