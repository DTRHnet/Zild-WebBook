import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const appendixDir = path.join(root, "client/src/content/appendices");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "client/src/content/meta/visual_manifest.json"), "utf8"));
const files = fs.readdirSync(appendixDir).filter((name) => name.endsWith(".md"));
let filesUpdated = 0;
let linksReplaced = 0;
for (const filename of files) {
  const match = filename.match(/^([A-J])-/);
  if (!match) continue;
  const id = match[1];
  const entries = manifest.appendices[id];
  if (!entries || entries.length < 4) throw new Error(`Expected four visual entries for appendix ${id}`);
  let text = fs.readFileSync(path.join(appendixDir, filename), "utf8");
  for (let index = 0; index < 3; index += 1) {
    const placeholder = `/assets/plates/appendix-${id}-${index + 1}.jpg`;
    const replacement = entries[index].src;
    const count = text.split(placeholder).length - 1;
    if (count) {
      text = text.split(placeholder).join(replacement);
      linksReplaced += count;
    }
  }
  if (!text.includes(`Evidence plate ${id}.4:`)) {
    const fourth = entries[3];
    text += `\n\n<!-- ZILD VISUAL -->\n![${fourth.alt}](${fourth.src})\n*${fourth.caption}*\n<!-- END ZILD VISUAL -->\n`;
  }
  fs.writeFileSync(path.join(appendixDir, filename), text);
  filesUpdated += 1;
}
console.log(JSON.stringify({ filesUpdated, linksReplaced, fourthPlatesAdded: filesUpdated }, null, 2));
if (filesUpdated !== 10 || linksReplaced < 30) process.exit(1);
