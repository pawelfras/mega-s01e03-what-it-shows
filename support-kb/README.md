# kb — the support knowledge base

**kb** = knowledge base. What the support desk knows about how our products break, written
down where the code can keep it honest.

One desk takes reports for every product we run: `sched-prod` (calendar invites for about
300k people) and the rest. When something
goes wrong, the reports reach the desk first. This kb is how the desk triages them, what each
incident turned out to be, and why we decided what we decided.

## What's here

```
src/routes/kb/      the pages (.svx: Markdown with components)
  triage/           how the desk handles incoming reports
  incidents/        one page per big ticket
  decisions/        numbered decision records
src/lib/kb/         components and the logic they run
src/lib/layouts/    the frame every page shares
src/lib/data/       exports from the ticket system
```

## Conventions

- Words in the page, logic in `src/lib` (imported as `#lib/…`). A number that can be computed belongs in a component.
- Every page starts with frontmatter: `title`, `owner`, `status`, `reviewed`.
- A decision is never edited after it is accepted. A new record replaces it.
- A page you add is signed: its frontmatter carries your `signature` and it ends with `<RenderStamp {signature} />`, so the desk knows who wrote it.

## Owners

Support desk. Decision records: whoever signed them.

---

Exported 2026-10-04 from the `support` repo, `apps/kb/` → `src/`.

## Added for MEGA.dev S01E03

- `src/routes/kb/incidents/4471-split/+page.svx` — signed page: #4471 holds three problems.
- `src/lib/kb/split.ts`, `src/lib/kb/SplitTable.svelte` — the counts, computed at build time.
- `package.json`, `svelte.config.js`, `vite.config.js`, `src/app.html`, `src/routes/+layout.ts` — a minimal SvelteKit + mdsvex setup to build the kb (`npm install && npm run build`).
- `rendered/4471-split.png` and `rendered/site/` — the page as the desk sees it (`rendered/site/kb/incidents/4471-split.html`).
