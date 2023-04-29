const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoute");
const connectDB = require("./db/connectDB");
require("dotenv").config({});

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", userRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server Started on Port ${process.env.PORT}`)
);
