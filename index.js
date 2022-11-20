const express = require("express");

const dotenv = require("dotenv");

const mongoose = require("mongoose");

const cors = require("cors");
const userRouter = require("./routes/User");



const app = express();
dotenv.config();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Working 👍🎊🎊");
});

app.use("/api/users", userRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected To DataBase");
  })
  .catch(() => {
    console.log("Error While Connecting the database");
  });

const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
  console.log(`Server Running Successfully on PORT ${PORT}`)
);
