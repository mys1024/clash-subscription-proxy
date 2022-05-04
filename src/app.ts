import { Application } from "./deps.ts";
import output from "./utils/output.ts";
import router from "./router.ts";

const app = new Application();

// router
app.use(router.routes());

// logger
app.use(async (ctx, next) => {
  const startTime = Date.now();
  await next();
  const endTime = Date.now();
  output.log([
    ctx.request.ip,
    ctx.request.method,
    ctx.request.url,
    ctx.response.status,
    `${endTime - startTime}ms`, // response time
  ].join(" "));
});

export default app;
