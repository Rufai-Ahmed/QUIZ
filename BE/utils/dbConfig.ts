import mongoose from "mongoose";

const URL: string = "mongodb://localhost:27017/nurseryDB";

export const mainConnection = async () => {
  try {
    await mongoose.connect(URL).then(() => {
      console.log("Database connected");
    });
  } catch (error) {
    console.log(error);
  }
};
