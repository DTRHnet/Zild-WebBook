import fs from "node:fs";
import path from "node:path";

const root = new URL("..", import.meta.url);
const manifestPath = new URL("client/src/content/meta/visual_manifest.json", root);
const chapterDir = new URL("client/src/content/chapters/", root);
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const asset = (name) => `/manus-storage/${name}`;
const urls = {
  hero: asset("zild-hero_1472b9c5.jpg"),
  ark: asset("zild-ark_6723620a.jpg"),
  interior: asset("zild-ark-interior_b9d898b4.jpg"),
  canopy: asset("zild-canopy_1c912285.jpg"),
  forest: asset("zild-forest-plate_b85062e9.jpg"),
  isaac: asset("zild-isaac-portrait_a4bfa1f5.jpg"),
  lauren: asset("zild-lauren-portrait_159de4f6.jpg"),
  spacy: asset("zild-spacy-portrait_59a23132.jpg"),
};
const byChapter = {
  1: ["hero", "isaac"], 2: ["ark", "interior"], 3: ["isaac", "lauren"],
  4: ["ark", "hero"], 5: ["forest", "canopy"], 6: ["forest", "canopy"],
  7: ["spacy", "canopy"], 8: ["ark", "spacy"], 9: ["ark", "isaac"],
  10: ["forest", "lauren"], 11: ["interior", "spacy"], 12: ["hero", "lauren"],
  13: ["forest", "isaac"], 14: ["ark", "hero"], 15: ["isaac", "lauren"],
  16: ["interior", "forest"], 17: ["hero", "spacy"],
};
let manifestChanged = 0;
for (const [key, entries] of Object.entries(manifest.chapters)) {
  const n = Number(String(key).match(/\d+/)?.[0]);
  const selected = byChapter[n];
  if (!selected || entries.length < 2) throw new Error(`Missing chapter mapping for ${key}`);
  entries.slice(0, 2).forEach((entry, index) => {
    const next = urls[selected[index]];
    if (entry.src !== next) { entry.src = next; manifestChanged += 1; }
  });
}
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
let filesChanged = 0;
let linksChanged = 0;
for (const file of fs.readdirSync(chapterDir).filter((f) => f.endsWith(".md"))) {
  const n = Number(file.slice(0, 2));
  const selected = byChapter[n];
  const filePath = new URL(file, chapterDir);
  let text = fs.readFileSync(filePath, "utf8");
  let i = 0;
  const nextText = text.replace(/(!\[[^\]]*\]\()([^)]*)(\))/g, (match, open, _old, close) => {
    if (i >= 2) return match;
    linksChanged += 1;
    return `${open}${urls[selected[i++]]}${close}`;
  });
  if (nextText !== text) { fs.writeFileSync(filePath, nextText); filesChanged += 1; }
}
console.log(JSON.stringify({ manifestChanged, filesChanged, linksChanged }, null, 2));
if (manifestChanged !== 34 || filesChanged !== 17 || linksChanged !== 34) process.exit(1);
