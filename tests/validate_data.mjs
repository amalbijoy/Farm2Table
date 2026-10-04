import { readFileSync } from "node:fs";

const source = readFileSync("app.js", "utf8");
const ids = [...source.matchAll(/\{ id: "([^"]+)"/g)].map((match) => match[1]);

if (new Set(ids).size !== ids.length) {
  throw new Error("Product/farmer IDs must be unique in the demo data.");
}

console.log("Identifier uniqueness check passed:", ids.length, "records");
