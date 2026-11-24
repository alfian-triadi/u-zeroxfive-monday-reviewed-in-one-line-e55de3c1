import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Monday opened with a 9 a.m. meeting to schedule another meeting, an inbox that multiplied overnight, and coffee that tasted like a resignation letter.";

// Gate: the entry must be 1-200 UTF-8 characters, not only whitespace.
if (ENTRY.length < 1 || ENTRY.length > 200 || ENTRY.trim().length === 0) {
  throw new Error(
    `Entry must be 1-200 characters, got ${ENTRY.length} characters.`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");

// Round-trip self-check: what we wrote must read back byte-identical.
const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== ENTRY) {
  throw new Error("Round-trip self-check failed: entry.txt differs from ENTRY.");
}
console.log(`Wrote ${ENTRY.length} characters to ${outPath} (self-check passed)`);
