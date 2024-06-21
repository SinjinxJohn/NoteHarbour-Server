const mongoose = require("mongoose");
const pageSchema = require("./pageModel");
// const pageModel = require('./pageModel');
// const pageSchema = require('./pageModel');
// const pageModel = require('./pageModel');

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel", // Reference to the user model
    required: true,
  },
  page: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PageModel",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const projectModel = mongoose.model("ProjectModel", projectSchema);
module.exports = projectModel;
