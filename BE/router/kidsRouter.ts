import { Router } from "express";
import {
  createKids,
  viewKids,
  viewSortedKids,
} from "../controller/kidsController";

const router: Router = Router();

router.route("/viewKids").get(viewKids);
router.route("/createKid").post(createKids);
router.route("/sortedKids").get(viewSortedKids);

export default router;
