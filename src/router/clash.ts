import { oak } from "../deps.ts";
import { getClashProfileParser } from "../parser/clash/index.ts";

const router = new oak.Router();

/**
 * @see https://github.com/CareyWang/sub-web
 * @see https://sub-web.netlify.app/
 */
const subscriptionConverterApiUrl =
  `https://api.wcc.best/sub?target=clash&insert=false`;

router.get("/profile", async (ctx) => {
  // get params
  const url = ctx.request.url.searchParams.get("url");
  const parserName = ctx.request.url.searchParams.get("parser");
  // check params
  if (!url || !parserName) {
    ctx.response.status = 400;
    return;
  }
  const parser = getClashProfileParser(parserName);
  if (!parser) {
    ctx.response.status = 400;
    return;
  }
  // fetch clash profile from source URL
  const res = await fetch(`${subscriptionConverterApiUrl}&url=${url}`);
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
