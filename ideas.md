# Zild Reader — Design Brainstorm

## Approach 1

**Theme Name:** Ash Archive

**Very Brief Intro:** An editorial reading room shaped by Earth’s ruin: warm paper, soot-black navigation, mineral blue accents, and archival marks. The experience feels intimate, serious, and tactile rather than like a generic digital library.

**Probability:** 0.07

## Approach 2

**Theme Name:** Signal Garden

**Very Brief Intro:** A living interface inspired by Zild’s breathing forests, with luminous pulse traces, botanical diagrams, and a dark field that makes each chapter feel discovered rather than selected. The mood is curious, ecological, and quietly uncanny.

**Probability:** 0.04

## Approach 3

**Theme Name:** Mission Ledger

**Very Brief Intro:** A restrained expedition dossier that treats the book as a recovered record: precise metadata, numbered tabs, field annotations, and a navigable evidence trail. The emotional tone is forensic, humane, and alert to what the archive cannot prove.

**Probability:** 0.02

# Chosen Approach: Ash Archive

## Design Movement

Contemporary editorial brutalism with archival and field-notebook references. The interface should feel like a beautifully preserved reading table assembled from paper, oxidized metal, tracing film, and quiet instrument light.

## Core Principles

1. **Reading is the primary action.** Navigation supports the prose and never competes with it.
2. **Evidence has texture.** Chapter metadata, appendix links, and editorial notes should feel like catalogued artifacts rather than dashboard widgets.
3. **Warmth against damage.** The palette uses bone, ash, ink, rust, and a signature mineral blue so the interface carries both human memory and planetary strangeness.
4. **Asymmetry creates attention.** Use a strong left rail, offset content columns, hanging chapter numbers, and occasional marginalia instead of a centered card stack.

## Color Philosophy

The background is a pale mineral-bone rather than pure white, evoking paper aged by dust and machine heat. Ink-black text creates long-form reading comfort. Rust and ember-red appear sparingly for warnings and irreversible events; they should never become decorative red noise. Signature mineral blue marks living systems, pulse signals, active links, and the possibility of communication. A deep blue-black panel anchors navigation like the Ark’s instrument deck.

**Signature Brand Color:** Mineral Pulse Blue — `#2D6C78`.

## Layout Paradigm

A persistent vertical archive rail holds the Zild mark, reading progress, chapter navigation, and appendix access. The main reading field is offset to the right with a narrow metadata gutter for chapter number, word count, and motif tags. On smaller screens the rail becomes a compact top bar and the metadata gutter folds into a chapter header. The home page uses a split composition: a large title field and an irregular archive card stack rather than a centered hero.

## Signature Elements

1. **Pulse ticks:** thin horizontal marks and small animated indicators that echo the duct-beat and signal intervals.
2. **Archive tabs:** clipped-corner labels for chapters, appendices, and editorial records, with restrained numbering.
3. **Marginal evidence:** small blue annotations showing motifs, open questions, and related appendices without interrupting the reading column.

## Interaction Philosophy

Interactions should feel like handling an archive: immediate, tactile, and low drama. Hover states reveal a little more metadata. Chapter navigation slides a narrow index into view instead of opening a generic modal. Progress is shown as a quiet pulse line. Search is direct and keyboard-friendly. No interaction should obscure the prose for longer than necessary.

## Animation

Use short, deliberate transitions under 280ms. Archive tabs lift by two pixels on hover; pulse indicators breathe once when a page loads; chapter changes fade the reading column without moving the whole layout. Use transform and opacity only for movement. Respect reduced-motion preferences. Avoid ambient animation behind text.

## Typography System

Use **DM Serif Display** for the book title, chapter titles, and major editorial headings. Use **IBM Plex Sans** for navigation, metadata, labels, and controls. Use **Source Serif 4** for long-form chapter prose to create a calm, bookish reading texture. Headings should be compact and assertive; prose should use a generous measure, 1.75 line height, and a slightly warm ink color.

## Brand Essence

**Positioning:** A considered digital reading room for Zild’s final expanded edition, built for readers who want the story, its evidence, and its unanswered questions in one coherent archive.

**Personality:** tactile, intelligent, uncanny.

## Brand Voice

Headlines are concise and atmospheric. CTAs are specific and unhurried. Microcopy sounds like an archivist who respects the reader’s attention.

- “Read the signal from the beginning.”
- “Open the evidence behind the story.”

Generic welcome language is prohibited. The app should not say “Welcome to our website” or “Get started today.”

## Wordmark and Logo

The mark is a compact symbol of two offset arcs crossed by a single pulse line: one arc represents the twin moons, the second the living world, and the line the memory signal carried between them. It should appear as a bold symbol without text in the header and favicon; the wordmark uses DM Serif Display with a custom-spaced “ZILD” lockup beside the mark.

## File-level reminder

Every new CSS, component, and page file should begin with a short comment naming the Ash Archive direction and the specific way that file reinforces it. The design test is: **Does this choice make the reader feel closer to the recovered book, or does it turn the archive into generic software?**
