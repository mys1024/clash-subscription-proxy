import type { ClashProfileParser } from "../../types.ts";
import simpleParser from "./simple.ts";

export function getClashProfileParser(parserName: string): ClashProfileParser | undefined {
  switch (parserName) {
    case "simple":
      return simpleParser
  }
}
