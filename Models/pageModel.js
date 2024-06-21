const mongoose = require("mongoose");
// const noteSchema = require('./noteSchema');

const pageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProjectModel",
    required: true,
  },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NotesModel",
    },
  ],
  members: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
      },

      role: {
        type: String,
        enum: ["page_admin", "page_member"],
        default: "page_member",
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const pagemodel = mongoose.model("PageModel", pageSchema);
module.exports = pagemodel;
// module.exports = pageSchema;
