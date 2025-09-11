import mongoose from "mongoose";

const authSchema = mongoose.Schema(
  {
    userName: {
      type: "String",
      requires: true,
    },
    email: {
      type: "String",
      requires: true,
    },
    password: {
      type: "String",
      requires: true,
    },
  },
  { timestamps: true }
);

export const AuthModel = new mongoose.model("userAuthentication", authSchema);
