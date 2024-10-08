// entry point of BE
require("dotenv").config();
const express = require("express");
const db = require("../db");
const PizzasRoute = require("../routes/pizzasRoute");
const UsersRoute = require("../routes/usersRoute");
const OrdersRoute = require("../routes/ordersRoute");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: ["https://mern-pizza-two.vercel.app", "http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
// app.use(cors());

app.get("/", (req, res) => res.send("Express on Vercel"));

app.use("/api/pizzas", PizzasRoute);
app.use("/api/users", UsersRoute);
app.use("/api/orders", OrdersRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port}`);
