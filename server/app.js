const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

console.log("ddd", process.env.MONGO_URL);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected mongoDB 🌱"))
  .catch((err) => console.error("err", err));

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`Start Server Port ${process.env.PORT} 🌐`);
});
