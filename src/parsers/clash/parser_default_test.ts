import { asserts } from "../../deps.ts";
import defaultParser from "./parser_default.ts";

Deno.test("Test Default ClashProfileParser", () => {
  let profile = "foo: bar";
  asserts.assertEquals(defaultParser(profile), profile);
  profile = "Any string!!!";
  asserts.assertEquals(defaultParser(profile), profile);
});
