const express = require("express");
const app = express();
const mongoose = require("mongoose");
const RecipesRoute = require("./routes/recipes");
const cors = require("cors");

mongoose
  .connect("mongodb://localhost:27017/recipes")
  .then(() => {
    console.log("connexion ok");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/recipes", RecipesRoute);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
