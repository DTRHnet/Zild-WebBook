/* Ash Archive direction: this shell behaves like a recovered reading room—an offset archive rail, quiet pulse marks, and no interface layer competing with the prose. */

import { useEffect, useMemo, useState } from "react";
import { Link, Route, Switch, useLocation, useRoute } from "wouter";
import { Streamdown } from "streamdown";
import { ArrowLeft, ArrowRight, BookOpen, ChevronRight, Menu, Search, Volume2, X } from "lucide-react";
import { chapters, appendices, formatWords, getAdjacent, getItem, type ReadingItem } from "./lib/content";
import Home from "./pages/Home";
import { Button } from "./components/ui/button";

function Mark({ small = false }: { small?: boolean }) {
  return <div className={small ? "mark mark-small" : "mark"} aria-label="Zild mark"><span /><span /><i /></div>;
}

function ArchiveRail({ onClose }: { onClose?: () => void }) {
  const [location] = useLocation();
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return chapters.filter((chapter) => !q || `${chapter.number} ${chapter.title}`.toLowerCase().includes(q));
  }, [query]);
  return <aside className="archive-rail">
    <div className="rail-top">
      <Link href="/" className="brand-lockup" onClick={onClose}><Mark /><span><strong>ZILD</strong><small>RECOVERED EDITION</small></span></Link>
      {onClose && <button className="rail-close" onClick={onClose} aria-label="Close navigation"><X size={18} /></button>}
    </div>
    <div className="rail-intro"><span className="eyebrow">Z3 / FINAL REVISION</span><p>A living archive of the expanded text, its evidence, and the questions it leaves breathing.</p></div>
    <div className="rail-search"><Search size={15} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find a chapter" aria-label="Find a chapter" /></div>
    <nav className="chapter-nav" aria-label="Chapter navigation">
      <div className="nav-label">THE BOOK <span>{chapters.length} CHAPTERS</span></div>
      {filtered.map((chapter) => <div className="chapter-row" key={chapter.slug}><Link href={`/chapter/${chapter.slug}`} onClick={onClose} className={location === `/chapter/${chapter.slug}` ? "chapter-link active" : "chapter-link"}><b>{chapter.number}</b><span>{chapter.title.replace(/^Chapter\s+\d+\s*[—:-]?\s*/i, "")}</span></Link>{chapter.audioSrc && <a className="chapter-audio-link" href={chapter.audioSrc} aria-label={`Listen to ${chapter.title}`} title="Listen to verified chapter audio"><Volume2 size={14} /></a>}</div>)}
    </nav>
    <div className="rail-bottom"><Link href="/appendices" onClick={onClose} className={location === "/appendices" ? "archive-link active" : "archive-link"}><span className="pulse-dot" />Open the appendices <ChevronRight size={15} /></Link><Link href="/about" onClick={onClose} className="archive-link muted"><BookOpen size={15} />About this edition <ChevronRight size={15} /></Link></div>
  </aside>;
}

function TopBar({ onMenu }: { onMenu: () => void }) {
  return <header className="mobile-top"><button className="icon-button" onClick={onMenu} aria-label="Open archive navigation"><Menu size={20} /></button><Link href="/" className="mobile-brand"><Mark small /><span>ZILD</span></Link><Link href="/appendices" className="mobile-appendix">A–J</Link></header>;
}

function ReadingLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => { const update = () => { const max = document.documentElement.scrollHeight - window.innerHeight; setProgress(max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0); }; update(); window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update); }, []);
  return <div className="app-shell"><div className="progress-line" style={{ width: `${progress}%` }} /><TopBar onMenu={() => setMobileOpen(true)} /><div className={mobileOpen ? "mobile-drawer open" : "mobile-drawer"}><ArchiveRail onClose={() => setMobileOpen(false)} /></div><div className="desktop-rail"><ArchiveRail /></div><main className="main-field">{children}</main></div>;
}

function ChapterPage({ item }: { item: ReadingItem }) {
  const { previous, next } = getAdjacent(item);
  return <article className="reading-page">
    <div className="reading-crumb"><span>FINAL REVISION</span><i /> CHAPTER {item.number}</div>
    <div className="reading-grid"><aside className="reading-meta"><span className="meta-number">{item.number}</span><span className="meta-label">{item.motif}</span><span className="meta-words">{formatWords(item.words)} words</span><span className="meta-plates">{item.plates.length} visual plates</span>{item.audioSrc && <a className="chapter-listen" href={item.audioSrc}><Volume2 size={14} />Listen / verified</a>}</aside><div className="prose-wrap"><div className="chapter-kicker">ZILD / EXPANDED EDITION</div><Streamdown className="prose">{item.raw}</Streamdown><footer className="reading-footer"><Link href={previous ? `/chapter/${previous.slug}` : "/"} className="footer-nav"><ArrowLeft size={16} /><span><small>PREVIOUS</small>{previous?.title ?? "The archive"}</span></Link><div className="footer-pulse"><span /><span /><span /><span /><span /></div><Link href={next ? `/chapter/${next.slug}` : "/appendices"} className="footer-nav next"><span><small>{next ? "NEXT CHAPTER" : "BACK MATTER"}</small>{next?.title ?? "The appendices"}</span><ArrowRight size={16} /></Link></footer></div></div>
  </article>;
}

function AppendixPage({ item }: { item: ReadingItem }) {
  const { previous, next } = getAdjacent(item);
  return <article className="reading-page appendix-page"><div className="reading-crumb"><span>BACK MATTER</span><i /> APPENDIX {item.number}</div><div className="reading-grid"><aside className="reading-meta"><span className="meta-number">{item.number}</span><span className="meta-label">Evidence / interpretation</span><span className="meta-words">{formatWords(item.words)} words</span><span className="meta-plates">{item.plates.length} evidence plates</span></aside><div className="prose-wrap"><div className="chapter-kicker">ZILD / APPENDIX FILE</div><Streamdown className="prose">{item.raw}</Streamdown><footer className="reading-footer"><Link href={previous ? `/appendix/${previous.slug}` : "/appendices"} className="footer-nav"><ArrowLeft size={16} /><span><small>PREVIOUS FILE</small>{previous?.title ?? "Appendix index"}</span></Link><div className="footer-pulse"><span /><span /><span /><span /><span /></div><Link href={next ? `/appendix/${next.slug}` : "/"} className="footer-nav next"><span><small>{next ? "NEXT FILE" : "RETURN"}</small>{next?.title ?? "The archive"}</span><ArrowRight size={16} /></Link></footer></div></div></article>;
}

function AppendixIndex() { return <section className="index-page"><div className="reading-crumb"><span>BACK MATTER</span><i /> APPENDIX INDEX</div><div className="index-hero"><div><span className="eyebrow">A–J / EVIDENCE FILES</span><h1>What the story could not<br /><em>stop to explain.</em></h1></div><div className="index-note"><span className="pulse-dot" /><p>The appendices are companions, not corrections. Read them after the chapters, when a pulse, object, or phrase has had time to return.</p></div></div><div className="appendix-list">{appendices.map((item) => <Link key={item.slug} href={`/appendix/${item.slug}`} className="appendix-row"><span className="appendix-letter">{item.number}</span><span className="appendix-thumb"><img src={item.plates[0]?.src} alt="" /></span><span className="appendix-copy"><strong>{item.title.replace(/^Appendix\s+[A-J]\s*[—:-]?\s*/i, "")}</strong><small>{formatWords(item.words)} words · {item.plates.length} evidence plates</small></span><ArrowRight size={18} /></Link>)}</div></section>; }

function AboutPage() { return <section className="about-page"><div className="reading-crumb"><span>ARCHIVE NOTE</span><i /> ABOUT THIS EDITION</div><div className="about-copy"><span className="eyebrow">ZILD / Z3</span><h1>A story is also<br /><em>what it remembers.</em></h1><p className="lead">This reader presents the final expanded zild3 revision of <em>Zild: Echoes Under Two Moons</em> alongside its detailed back matter. The chapter text remains the primary record. The appendices gather systems, chronology, character histories, ecological evidence, and questions that deserve to remain open.</p><div className="about-columns"><div><span className="eyebrow">READING ORDER</span><p>Begin with Chapter One and move through the numbered chapters. Return to the appendices when you want to trace a motif, compare competing interpretations, or follow a piece of evidence across the book.</p></div><div><span className="eyebrow">EDITORIAL PROMISE</span><p>Additions in zild3 were screened for relevance. New material exists to deepen a choice, clarify a consequence, give a character agency, make the world’s systems legible, or plant a detail that earns its later return.</p></div></div><Link href="/chapter/01-embers-beneath-an-ash-blue-sky" className="primary-cta">Read from the beginning <ArrowRight size={16} /></Link></div></section>; }

function NotFound() { return <section className="not-found"><span className="eyebrow">SIGNAL LOST</span><h1>This record is not in the archive.</h1><Link href="/">Return to the reading room <ArrowRight size={16} /></Link></section>; }

function Router() { return <Switch><Route path="/" component={Home} /><Route path="/appendices" component={AppendixIndex} /><Route path="/about" component={AboutPage} /><Route path="/chapter/:slug">{(params) => { const item = getItem("chapter", params.slug); return item ? <ChapterPage item={item} /> : <NotFound />; }}</Route><Route path="/appendix/:slug">{(params) => { const item = getItem("appendix", params.slug); return item ? <AppendixPage item={item} /> : <NotFound />; }}</Route><Route component={NotFound} /></Switch>; }

export default function App() { return <ReadingLayout><Router /></ReadingLayout>; }
