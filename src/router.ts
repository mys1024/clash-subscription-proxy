import { oak } from "./deps.ts";
import { getClashProfileParser } from "./parser/clash/index.ts";

const router = new oak.Router();

router.get("/clash/profile", async (ctx) => {
  // get params
  const url = ctx.request.url.searchParams.get("url");
  const parserName = ctx.request.url.searchParams.get("parser");
  // check params
  if (!url) {
    ctx.response.status = 400;
    return;
  }
  const parser = getClashProfileParser(parserName ? parserName : undefined);
  if (!parser) {
    ctx.response.status = 400;
    return;
  }
  // fetch clash profile from source URL
  const res = await fetch(url);
  const profile = await res.text();
  // response
  const passthroughHeaderField = ["subscription-userinfo"];
  for (const [name, value] of res.headers.entries()) {
    if (passthroughHeaderField.includes(name)) {
      ctx.response.headers.set(name, value);
    }
  }
  ctx.response.headers.set("x-proxy", "clash-subscription-proxy");
  ctx.response.body = parser(profile);
});

export default router;
