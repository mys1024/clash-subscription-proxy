import type { ClashProfileParser } from "../../types.ts";
import parser0 from "./parser0.ts";
import parser1 from "./parser1.ts";

export function getClashProfileParser(parserName = "CLASH-PROFILE-PARSER-0") {
  const map: Record<string, ClashProfileParser | undefined> = {
    "CLASH-PROFILE-PARSER-0": parser0, // default parser
    "CLASH-PROFILE-PARSER-1": parser1,
  };
  return map[parserName];
}
