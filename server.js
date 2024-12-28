const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/database");
const cors = require("cors");
dotenv.config();

const app = express();
const port = process.env.PORT || 5050;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

connectDB();