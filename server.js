const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/database");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
dotenv.config();

const app = express();
const port = process.env.PORT || 5050;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

connectDB();