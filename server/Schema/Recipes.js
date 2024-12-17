const mongoose = require("mongoose");
const { Schema } = mongoose;

const RecipesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  persons: {
    type: Number,
    required: true,
    default: 1,
  },

  preparationTime: {
    type: Number,
    required: true,
  },

  cooking: {
    type: Number,
    required: true,
  },

  ingredients: {
    type: Array,
    required: true,
  },

  category: {
    type: Array,
    required: true,
  },

  preparation: {
    type: String,
    required: true,
  },

  favorite: { type: Boolean, default: false },
});

const Recipes = mongoose.model("Recipes", RecipesSchema);

module.exports = Recipes;
