const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
dotenv.config();

const app = express();
const port = process.env.PORT || 5050;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/captains", captainRoutes);


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

connectDB();