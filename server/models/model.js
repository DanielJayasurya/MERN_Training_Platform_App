const mongoose = require("mongoose");

const registrationScheme = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  qualification: { type: String, required: true },
  gender: { type: String, required: true },
  location: { type: String, required: true },
  course: { type: String, required: true },
  status: { type: String, default: 'pending' },
  is_active: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
});
registrationScheme.pre("save", function (next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});
const Registration = mongoose.model("Registration", registrationScheme);

module.exports = Registration;
