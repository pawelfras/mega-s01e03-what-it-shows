# #4471 — what it shows

MEGA.dev S01E03. The support desk merged 412 date reports into one ticket, #4471. It holds three
problems; each has its own ticket here.

| problem | reports | ticket | state |
|---|---|---|---|
| `parser` — parser reads dates month first | 379 | [#1](../../issues/1) | closed · fixed |
| `hint` — booking-v3 date hint `MM/DD/YYYY` | 33 | [#2](../../issues/2) | closed · won't fix |
| `one-day` — date moves by one day (time zone) | 5 | [#3](../../issues/3) | open |

Counts as the desk's own view counts them; the 5 one-day reports are also counted under `parser`.

## The page

Signed `Paweł Fraś`, desk ref **DR-9JJC-JN0G**.

- the .svx: [`support-kb/src/routes/kb/incidents/4471-split/+page.svx`](support-kb/src/routes/kb/incidents/4471-split/+page.svx)
- the page as the desk will see it: [`support-kb/rendered/4471-split.html`](support-kb/rendered/4471-split.html)
  (one file), [`support-kb/rendered/4471-split.png`](support-kb/rendered/4471-split.png), and the whole built kb in
  [`support-kb/rendered/site/`](support-kb/rendered/site/kb/incidents/4471-split.html)

`support-kb/` is the kb export with the page added. Build it: `cd support-kb && npm install && npm run build`.
