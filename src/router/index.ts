import { oak } from "../deps.ts";
import clashRouter from "./clash.ts";

const router = new oak.Router();

router.all("/clash", clashRouter.routes());

export default router;
