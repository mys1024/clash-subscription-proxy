import { Application } from "./deps.ts";
import logger from "./middleware/logger.ts";
import router from "./router.ts";

const app = new Application();

// logger
app.use(logger());

// router
app.use(router.routes());

export default app;
