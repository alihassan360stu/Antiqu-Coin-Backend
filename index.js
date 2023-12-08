const express = require("express");
const user = require("./Router/user");
const app = express();

app.use(express.json());
app.use("/auth", user);

app.listen(3000, () => {
  console.log("connection successfully");
});
