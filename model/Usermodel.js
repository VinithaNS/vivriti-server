const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
      trim: true,
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
    },
    // password: {
    //   type: String,
    //   required:true,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
