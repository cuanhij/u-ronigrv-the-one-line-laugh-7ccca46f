// The One-Line Laugh — a make.fun bounty entry.
//
// Writes one funny line to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt). Deterministic: the same text on every run.
// Stdlib only, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I bought a standing desk to be healthier, and now I just sit on a taller chair.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

// The gate wants 1–200 Unicode code points, one line, not only whitespace.
// Fail loudly instead of writing an invalid entry.
const length = [...LINE].length;
if (length < 1 || length > 200 || LINE.includes("\n") || LINE.trim().length === 0) {
  throw new Error(`line is not a valid one-line entry (length ${length})`);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, LINE, "utf8");
