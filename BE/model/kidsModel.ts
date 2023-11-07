import { model, Document, Schema } from "mongoose";

interface iData {
  name: string;
  image: string;
}

interface iKidData extends iData, Document {}

const kidsModel = new Schema<iKidData>(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model<iKidData>("kids", kidsModel);
