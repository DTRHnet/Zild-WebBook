import fs from "node:fs";

const manifestPath = new URL("../client/src/content/meta/visual_manifest.json", import.meta.url);
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const assets = {
  isaac: "/manus-storage/zild-isaac-plate_9ad63568.jpg",
  lauren: "/manus-storage/zild-lauren-plate_66b11ac3.jpg",
  spacy: "/manus-storage/zild-spacy-plate_cdf09225.jpg",
  ark: "/manus-storage/zild-ark-plate_842bd178.jpg",
};
let updated = 0;
for (const collection of [manifest.chapters, manifest.appendices]) {
  for (const entries of Object.values(collection)) {
    for (const entry of entries) {
      if (assets[entry.anchor] && entry.src !== assets[entry.anchor]) {
        entry.src = assets[entry.anchor];
        updated += 1;
      }
    }
  }
}
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify({ updated, assets }, null, 2));
if (updated !== 64) process.exit(1);
