const mongoos = require("mongoose");

const User = mongoos.Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  userPhone: {
    type: Number,
    required: true,
  },
  userCity: {
    type: String,
    required: true,
  },
});

module.exports = mongoos.model("user", User);
