import type { ClashProfileParser } from "../../types.ts";
import defaultParser from "./default.ts";
import normalParser from "./normal.ts";
import simpleParser from "./simple.ts";

const parserMap: Record<string, ClashProfileParser | undefined> = {
  "normal": normalParser,
  "simple": simpleParser,
};

export function getClashProfileParser(parserName?: string) {
  if (!parserName) {
    return defaultParser;
  }
  return parserMap[parserName];
}
