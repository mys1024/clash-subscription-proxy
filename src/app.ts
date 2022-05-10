import { oak } from "./deps.ts";
import logger from "./middleware/logger.ts";
import router from "./router.ts";

const app = new oak.Application();

// logger
app.use(logger());

// router
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
