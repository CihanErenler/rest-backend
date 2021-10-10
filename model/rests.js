const mongoose = require("mongoose");

const rest = mongoose.Schema({
  rest_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  img_url: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Rest", rest);
