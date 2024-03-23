import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "please provide a username"],
    unique: [true, "name must be unique"],
  },
  email: {
    type: String,
    required: [true, "please provide an email"],
    unique: [true, "name must be unique"],
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: { type: String },
  forgotPasswordTokenExpiry: { type: Date },
  verifyToken: { type: String },
  verifyTokenExpiry: { type: Date },
});

const User = mongoose.models.users || model("users", userSchema);

export { User };
