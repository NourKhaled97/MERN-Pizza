// entry point of BE
const express = require("express");
const db = require("./db");
const Pizza = require("./models/pizzaModel");
const PizzasRoute = require("./routes/pizzasRoute");
const UsersRoute = require("./routes/usersRoute");

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get("/", (req, res) => {
  res.send("Server working ");
});

app.use("/api/pizzas", PizzasRoute);

app.use("/api/users", UsersRoute);

// if (process.env.MODE_ENV === "production") {
//   // tell the server what is the entry point of client (Frontend)
//   app.use("/", express.static("client/build"));
// }

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port}`);
