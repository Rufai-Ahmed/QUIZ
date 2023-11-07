import { Request, Response } from "express";
import kidsModel from "../model/kidsModel";

export const createKids = async (req: Request, res: Response) => {
  try {
    const { name, image } = req.body;

    const kids = await kidsModel.create({ name, image });

    return res.status(201).json({
      message: "Created",
      data: kids,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Error occured",
    });
  }
};

export const viewKids = async (req: Request, res: Response) => {
  try {
    const kids = await kidsModel.find();

    return res.status(201).json({
      message: "Created",
      data: kids,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Error occured",
    });
  }
};

export const viewSortedKids = async (req: Request, res: Response) => {
  try {
    const kids = await kidsModel.find().sort({ name: 1 });

    return res.status(201).json({
      message: "Created",
      data: kids,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Error occured",
    });
  }
};
