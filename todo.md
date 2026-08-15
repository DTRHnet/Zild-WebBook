# Vercel Migration Checklist

- [x] Inspect the current reader app’s scripts, content paths, client-side routes, and generated asset URLs.
- [x] Add Vercel-compatible build and SPA fallback configuration.
- [x] Add deployment documentation for importing `DTRHnet/zild-webbook` into Vercel.
- [x] Run type checking and production build.
- [x] Verify representative routes and static asset references.
- [x] Push the complete deployable app source to `DTRHnet/zild-webbook`.
- [x] Verify the remote branch, commit, and required deployment files.

# Chapter Formatting and Visual Expansion

- [x] Apply the supplied book-formatting rules consistently to all chapter Markdown and reader rendering.
- [x] Create and document a character, item, ship, and location visual bible.
- [x] Generate a consistent set of chapter, character, item, ship, and location images.
- [x] Add several relevant images to each chapter without changing the author’s wording or meaning.
- [x] Add visual plates and image links to the appendices.
- [x] Add asset navigation and captions to the web app.
- [x] Re-run Vercel checks and push the revised webbook.

# Approved Anchor-Based Visual Pass

- [x] Use the generated character, Ark, and memory-shard anchors as the visual source of truth.
- [x] Create deterministic evidence crops and plate variants from those anchors for remaining chapter and appendix placements.
- [x] Link every chapter and appendix visual with restrained captions and cross-references.
- [x] Verify the final Vercel build and push the revised webbook.

# Persistent Audiobook Recovery

- [ ] Recreate bounded narration segments from the final zild3 chapters.
- [ ] Maintain a JSON completion ledger after every saved audio segment.
- [ ] Concatenate and validate each chapter immediately after its segments complete.
- [ ] Add a verified audio control beside each completed chapter in the web app table of contents.
- [ ] Push each validated chapter audio file and linked table-of-contents update before beginning the next chapter.
- [ ] Package every verified chapter file without overwriting completed work.
