import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { loginUser, registerUser } from "./controller/AuthController.js";
import { createExpanse, deleteExpanseData, getExpanseData } from "./controller/ExpanseController.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors(
//   {
//   origin:"https://expansetracker992.netlify.app/" || "http://localhost:5173"
// }
));

//register User
app.post("/userAuth", registerUser);

//login user
app.post("/loginAuth", loginUser);

//expanseData
app.post("/expanseData", createExpanse);
app.delete("/expanseData/:id", deleteExpanseData);
app.get("/expanseData", getExpanseData);

mongoose.connect(process.env.DB_URL).then(() => {
  console.log("database connected");
  app.listen(process.env.PORT, () => {
    console.log(`server running at port ${process.env.PORT}`);
  });
});
