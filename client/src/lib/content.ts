/* Ash Archive direction: the content index treats every chapter and appendix as a catalogued artifact, keeping navigation precise and the reading surface calm. */

import visualManifest from "../content/meta/visual_manifest.json";
import audiobookManifest from "../content/meta/audiobook_manifest.json";

export type VisualPlate = {
  src: string;
  anchor: string;
  kind: "interpretive plate" | "evidence plate";
  caption: string;
  alt: string;
};

const typedManifest = visualManifest as unknown as { chapters: Record<string, VisualPlate[]>; appendices: Record<string, VisualPlate[]> };

export type ReadingItem = {
  slug: string;
  title: string;
  number: string;
  raw: string;
  kind: "chapter" | "appendix";
  words: number;
  motif: string;
  plates: VisualPlate[];
  audioSrc?: string;
  sampleAudioSrc?: string;
  sampleDurationSeconds?: number;
};

// Updated only after a chapter has been fully assembled and validated.
const verifiedAudiobooks: Record<string, string> = {
  "02-launch-through-ash-and-void": "/audio/02-launch-through-ash-and-void.mp3",
  "03-hearts-in-the-vacuum-pulse-in-the-ductwork": "/audio/03-hearts-in-the-vacuum-pulse-in-the-ductwork.mp3",
};
const audiobookEntries = audiobookManifest.chapters as Record<string, { sampleSrc?: string; sampleDurationSeconds?: number }>;

const chapterFiles = import.meta.glob("../content/chapters/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const appendixFiles = import.meta.glob("../content/appendices/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const motifs = [
  "Ash / archive",
  "Transit / signal",
  "Duct-beat / trust",
  "Silence / pressure",
  "Depth / evidence",
  "Groundfall / breath",
  "Prime pulse / contact",
  "Inhibitors / ethics",
  "Return / altered home",
  "Predators / choice",
  "The Loom / agency",
  "Hollow / separation",
  "Forest / ambiguity",
  "Sundering / consequence",
  "Last stand / sacrifice",
  "Ashes / carrying memory",
  "Remembering / invitation",
];

function cleanSlug(path: string) {
  return path.split("/").pop()?.replace(/\.md$/, "") ?? "";
}

function parseTitle(raw: string) {
  return raw.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? "Untitled record";
}

function wordCount(raw: string) {
  return raw.replace(/[#>*`|\[\]()]/g, " ").split(/\s+/).filter(Boolean).length;
}

export const chapters: ReadingItem[] = Object.entries(chapterFiles)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, raw], index) => ({
    slug: cleanSlug(path),
    title: parseTitle(raw),
    number: String(index + 1).padStart(2, "0"),
    raw,
    kind: "chapter",
    words: wordCount(raw),
    motif: motifs[index] ?? "Signal / memory",
    plates: typedManifest.chapters[String(index + 1).padStart(2, "0")] ?? [],
    audioSrc: verifiedAudiobooks[cleanSlug(path)],
    sampleAudioSrc: audiobookEntries[cleanSlug(path)]?.sampleSrc,
    sampleDurationSeconds: audiobookEntries[cleanSlug(path)]?.sampleDurationSeconds,
  }));

export const appendices: ReadingItem[] = Object.entries(appendixFiles)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, raw]) => ({
    slug: cleanSlug(path),
    title: parseTitle(raw),
    number: cleanSlug(path).slice(0, 1),
    raw,
    kind: "appendix",
    words: wordCount(raw),
    motif: "Evidence / interpretation",
    plates: typedManifest.appendices[cleanSlug(path).slice(0, 1)] ?? [],
  }));

export const allItems = [...chapters, ...appendices];

export function getItem(kind: ReadingItem["kind"], slug: string) {
  return (kind === "chapter" ? chapters : appendices).find((item) => item.slug === slug);
}

export function getAdjacent(item: ReadingItem) {
  const list = item.kind === "chapter" ? chapters : appendices;
  const index = list.findIndex((entry) => entry.slug === item.slug);
  return { previous: list[index - 1], next: list[index + 1] };
}

export function formatWords(words: number) {
  return new Intl.NumberFormat("en-US").format(words);
}
