<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import type { Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';
  import { splitTicket, type Problem } from '#lib/kb/split';

  // tickets: problem → the ticket filed for it, and where it stands.
  type Ticket = { href: string; state: string };
  let { ticket, tickets = {} }: { ticket: number; tickets?: Partial<Record<Problem, Ticket>> } = $props();

  const split = $derived(splitTicket(reports as Report[], ticket, tenantOf));
  const rows = $derived((reports as Report[]).filter((r) => r.mergedInto === ticket).length);
  const label = (href: string) => href.replace(/^.*\/issues\//, '#');
</script>

<p class="sum">
  <strong>{split.merged.length}</strong> reports in #{ticket} ({rows - split.merged.length} rows in the export are
  repeats) · <strong>{split.rows.length}</strong> problems
</p>

<table>
  <thead>
    <tr><th>problem</th><th>reports</th><th>tenants</th><th>seen</th><th>intake tag differs</th><th>ticket</th><th>state</th></tr>
  </thead>
  <tbody>
    {#each split.rows as g (g.problem)}
      {@const t = tickets[g.problem]}
      <tr class:open={t?.state.startsWith('open')}>
        <td><code>{g.problem}</code></td>
        <td>{g.reports}</td>
        <td>{g.tenants}</td>
        <td>{g.firstSeen} → {g.lastSeen}</td>
        <td>{g.mistagged}</td>
        <td>{#if t}<a href={t.href}>{label(t.href)}</a>{:else}none yet{/if}</td>
        <td>{t?.state ?? ''}</td>
      </tr>
    {/each}
  </tbody>
</table>

{#each split.rows.filter((g) => g.ids.length) as g (g.problem)}
  <p class="note">
    {g.problem}: {g.ids.join(', ')}. Counted where the desk filed them, under <code>{g.alsoIn.join(', ')}</code>, and
    listed again here as their own problem.
  </p>
{/each}

<style>
  .sum { font-size: 1.1rem; }
  .note { color: var(--muted); font-size: 0.85em; }
  .open td { background: var(--warn-bg); }
  .open td:last-child { color: var(--warn); font-weight: 600; }
</style>
