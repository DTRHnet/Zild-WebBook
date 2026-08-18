import fs from "node:fs";

const manifestPath = new URL("../client/src/content/meta/visual_manifest.json", import.meta.url);
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const additions = {
  A: ["/manus-storage/zild-appendix-a-plate_9ea353f4.jpg", "continuity chronology", "Evidence plate A.4: continuity chronology and Ark departure record."],
  B: ["/manus-storage/zild-appendix-b-plate_3269b690.jpg", "ark systems", "Evidence plate B.4: Ark systems and life-support architecture."],
  C: ["/manus-storage/zild-appendix-c-plate_8c8e9bcb.jpg", "xenobiology", "Evidence plate C.4: Zild xenobiology field sample."],
  D: ["/manus-storage/zild-appendix-d-plate_c31f4532.jpg", "ai architecture", "Evidence plate D.4: Spacy and the private archive channel."],
  E: ["/manus-storage/zild-appendix-e-plate_32c0535f.jpg", "signal analysis", "Evidence plate E.4: signal analysis workbench."],
  F: ["/manus-storage/zild-appendix-f-plate_70109680.jpg", "field contact", "Evidence plate F.4: Zild field-contact perimeter."],
  G: ["/manus-storage/zild-appendix-g-plate_24942cfb.jpg", "loom map", "Evidence plate G.4: Loom contact map and braided signal paths."],
  H: ["/manus-storage/zild-appendix-h-plate_8aade1df.jpg", "signal lexicon", "Evidence plate H.4: material signal lexicon artifacts."],
  I: ["/manus-storage/zild-appendix-i-plate_4eb6ab7d.jpg", "ritual memory", "Evidence plate I.4: communal memory and departure ritual."],
  J: ["/manus-storage/zild-appendix-j-plate_7ee852b2.jpg", "contingency planning", "Evidence plate J.4: post-Sundering contingency planning."],
};
let added = 0;
for (const [id, [src, anchor, caption]] of Object.entries(additions)) {
  const entries = manifest.appendices[id];
  if (!entries) throw new Error(`Missing appendix ${id}`);
  if (!entries.some((entry) => entry.src === src)) {
    entries.push({
      src,
      anchor,
      kind: "evidence plate",
      caption,
      alt: `${caption.replace(/\.$/, "")} Generated Ash Archive documentary plate.`,
    });
    added += 1;
  }
}
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify({ added, appendixPlateCounts: Object.fromEntries(Object.entries(manifest.appendices).map(([id, entries]) => [id, entries.length])) }, null, 2));
if (added !== 10) process.exit(1);
