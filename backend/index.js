const express = require("express");
const cors = require("cors");
require("dotenv").config();
const router = require("./routes/index.js");

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Сервер работает на http://localhost:${PORT}`);
});
