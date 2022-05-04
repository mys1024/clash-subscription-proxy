import type { ClashProfileParser } from "../../types.ts";
import defaultParser from "./parser_default.ts";
import normalParser from "./parser_normal.ts";

export function getClashProfileParser(
  parserName = "CLASH-PROFILE-PARSER-DEFAULT",
): ClashProfileParser | undefined {
  const map: Record<string, ClashProfileParser | undefined> = {
    "CLASH-PROFILE-PARSER-DEFAULT": defaultParser, // default parser
    "CLASH-PROFILE-PARSER-1": normalParser,
    "CLASH-PROFILE-PARSER-NORMAL": normalParser,
  };
  return map[parserName];
}
