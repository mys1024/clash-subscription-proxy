import { Application } from "./deps.ts";
import router from "./router.ts";

const app = new Application();

app.use(router.routes());

export default app;
