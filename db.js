const mongoose = require("mongoose");

var mongoURL =
  "mongodb+srv://NourKhaled:Nour97App@firstproject.xruff.mongodb.net/mern-pizza?retryWrites=true&w=majority&appName=firstProject";

// because useUnifiedTopology: true, useNewUrlParser: true are deprecated
// mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connect(mongoURL);

var db = mongoose.connection;

db.on("connected", () => {
  console.log("MongoDb connect successfully");
});

db.on("error", () => {
  console.log("Mongodb connect failed");
});

module.exports = mongoose;
