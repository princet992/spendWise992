import mongoose from "mongoose";

const expanseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    payment: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    isRecurring: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userAuthentication",
    },
  },
  { timestamps: true }
);

export const ExpanseModel = new mongoose.model("myExpanseData", expanseSchema);
