import { AuthModel } from "../model/AuthModel.js";
import { ExpanseModel } from "../model/ExpanseModel.js";

export const createExpanse = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await AuthModel.findById({ userId });
    if (!user) res.status(400).send({ message: "user not found" });
    const expanseData = await ExpanseModel.create({
      ...req.body,
      userId,
    });
    if (expanseData) res.status(200).send({ message: "expanse created", expanseData });
    return res.status(400).send({ message: "failed to create data" });
  } catch (error) {
    console.log("error", error);
  }
};

//delete expanse data
export const deleteExpanseData = async (req, res) => {
  try {
    const data = await ExpanseModel.deleteOne({ _id: req.params.id });
    if (data.deletedCount === 1) res.status(200).send({ message: "deleted successfully" });
    return res.status(400).send({ message: "failed to delete data" });
  } catch (error) {
    console.log("error", error);
  }
};

//getExpanseData
export const getExpanseData = async (req, res) => {
  try {
    const data = await ExpanseModel.find({});
    if (data) res.status(200).send({ data });
    res.status(400).send({ message: "failed to get data" });
  } catch (error) {
    console.log("error", error);
  }
};
