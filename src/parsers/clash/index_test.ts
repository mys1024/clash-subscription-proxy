import { asserts } from "../../deps.ts";
import { getClashProfileParser } from "./index.ts";

Deno.test("Test Getter of ClashProfileParser", () => {
  const defaultParser = getClashProfileParser();
  asserts.assertExists(defaultParser);
  const shouldBeUndefined = getClashProfileParser("Non-Exist-Parser");
  asserts.assertEquals(shouldBeUndefined, undefined);
});
