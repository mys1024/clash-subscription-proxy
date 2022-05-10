import type { Middleware } from "../deps.ts";
import output from "../utils/output.ts";

export function logger(): Middleware {
  return async (ctx, next) => {
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
  };
}

export default logger;
