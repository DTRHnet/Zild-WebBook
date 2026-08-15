/* Ash Archive direction: the audio index is a field ledger—quiet, explicit, and never promises a recording before it is verified. */

import { Headphones, Play, Radio, Volume2 } from "lucide-react";
import { chapters } from "../lib/content";
import audiobookManifest from "../content/meta/audiobook_manifest.json";

type AudioRecord = {
  status: string;
  sampleSrc?: string;
  sampleDurationSeconds?: number;
  finalSrc?: string | null;
  note?: string;
};

const manifest = audiobookManifest as { edition: string; format: string; narrator: string; chapters: Record<string, AudioRecord> };

function labelSeconds(seconds?: number) {
  if (!seconds) return "";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.round(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
}

export default function AudioIndex() {
  return <section className="audio-index-page">
    <div className="reading-crumb"><span>AUDIO ARCHIVE</span><i /> NARRATION LEDGER</div>
    <div className="audio-index-hero"><div><span className="eyebrow">Z3 / LISTENING EDITION</span><h1>The story, kept<br /><em>in one voice.</em></h1><p>Each chapter appears here only after its final MP3 has been generated, assembled, and checked. A work-in-progress sample is explicitly marked rather than presented as a finished chapter.</p></div><div className="audio-spec"><Radio size={18} /><span>FORMAT</span><strong>{manifest.format}</strong><small>{manifest.narrator}</small></div></div>
    <div className="audio-ledger-label"><span>CHAPTER</span><span>RECORDING STATUS</span><span>ACCESS</span></div>
    <div className="audio-ledger">
      {chapters.map((chapter) => {
        const entry = manifest.chapters[chapter.slug];
        const source = entry?.finalSrc ?? entry?.sampleSrc;
        const isFinal = Boolean(entry?.finalSrc);
        return <article className={entry ? "audio-row active" : "audio-row"} key={chapter.slug}>
          <div className="audio-row-number">{chapter.number}</div>
          <div className="audio-row-copy"><strong>{chapter.title.replace(/^Chapter\s+\d+\s*[—:-]?\s*/i, "")}</strong><small>{entry?.note ?? "Queued for fixed-narrator MP3 production."}</small></div>
          <div className="audio-row-status"><span className={isFinal ? "audio-status final" : entry ? "audio-status sample" : "audio-status pending"}>{isFinal ? "VERIFIED MP3" : entry ? "SAMPLE / REVIEW" : "PENDING"}</span>{entry?.sampleDurationSeconds && <small>{labelSeconds(entry.sampleDurationSeconds)} sample</small>}</div>
          {source ? <a className="audio-access" href={source} download={!isFinal}><span>{isFinal ? "Listen" : "Download sample"}</span>{isFinal ? <Volume2 size={16} /> : <Play size={16} />}</a> : <span className="audio-access disabled"><span>Not released</span><Headphones size={16} /></span>}
        </article>;
      })}
    </div>
  </section>;
}
