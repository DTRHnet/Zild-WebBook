import fs from "node:fs";

const path = new URL("../client/src/content/meta/visual_manifest.json", import.meta.url);
const manifest = JSON.parse(fs.readFileSync(path, "utf8"));
const anchors = {
  isaac: "/manus-storage/zild-isaac-plate_c69b34e2.jpg",
  lauren: "/manus-storage/zild-lauren-plate_b90eef76.jpg",
  spacy: "/manus-storage/zild-spacy-plate_a03f670e.jpg",
  ark: "/manus-storage/zild-ark-plate_32f61f2c.jpg",
};
const appendixUploads = {
  A: "/manus-storage/zild-appendix-a-plate_9a43e47a.jpg",
  B: "/manus-storage/zild-appendix-b-plate_440c859c.jpg",
  C: "/manus-storage/zild-appendix-c-plate_292aae37.jpg",
  D: "/manus-storage/zild-appendix-d-plate_189e23d1.jpg",
  E: "/manus-storage/zild-appendix-e-plate_cb503f21.jpg",
  F: "/manus-storage/zild-appendix-f-plate_365626c4.jpg",
  G: "/manus-storage/zild-appendix-g-plate_04569243.jpg",
  H: "/manus-storage/zild-appendix-h-plate_ce8408f4.jpg",
  I: "/manus-storage/zild-appendix-i-plate_634b7fa1.jpg",
  J: "/manus-storage/zild-appendix-j-plate_70ef0b4b.jpg",
};
let changed = 0;
for (const [id, entries] of Object.entries(manifest.appendices)) {
  for (let i = 0; i < entries.length; i += 1) {
    const entry = entries[i];
    const next = i === 3 ? appendixUploads[id] : anchors[entry.anchor];
    if (next && entry.src !== next) {
      entry.src = next;
      changed += 1;
    }
  }
}
fs.writeFileSync(path, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify({ changed }, null, 2));
if (changed !== 40) process.exit(1);
