// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  integrations: {
    auth: { type: Boolean, default: false },
    authProviders: { type: Array, default: [] },
    payments: { type: Boolean, default: false },
    mailing: { type: Boolean, default: false },
    mongodb: { type: Boolean, default: false },
  },
});

module.exports = mongoose.model("User", UserSchema);
