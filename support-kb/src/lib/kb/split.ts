// Which problems a merged ticket holds, counted the way the desk's own view counts them
// (CauseTable): one cause per report by tenant (causes.ts). The desk's one-day notes
// (desk-notes.json) stay counted where they're filed, and are listed again as their own problem:
// they are no month flip, and the fix for their cause does not touch them.
import notes from '#lib/data/desk-notes.json';
import { groupByCause, readAs, uniqueById, type Report, type Tenant } from '#lib/kb/causes';

export type Problem = 'parser' | 'hint' | 'one-day' | 'unplaced';

export type ProblemRow = {
  problem: Problem;
  reports: number;
  tenants: number;
  firstSeen: string;
  lastSeen: string;
  // Reports intake tagged as something other than this problem.
  mistagged: number;
  // For one-day: the cause these reports are also counted under.
  alsoIn: string[];
  ids: string[];
};

export function splitTicket(all: Report[], ticket: number, tenantOf: (r: Report) => Tenant | undefined) {
  const merged = uniqueById(all).filter((r) => r.mergedInto === ticket);
  const groups = groupByCause(merged, tenantOf);
  const rows: ProblemRow[] = groups.map((g) => ({
    problem: g.cause,
    reports: g.reports.length,
    tenants: g.tenants,
    firstSeen: g.firstSeen,
    lastSeen: g.lastSeen,
    mistagged: g.reports.filter((r) => r.meta.intakeTag !== g.cause).length,
    alsoIn: [],
    ids: [],
  }));
  const oneDay = merged.filter((r) => notes.oneDayMove.includes(r.id));
  if (oneDay.length) {
    const days = oneDay.map((r) => r.receivedAt.slice(0, 10)).sort();
    rows.push({
      problem: 'one-day',
      reports: oneDay.length,
      tenants: new Set(oneDay.map((r) => r.tenant)).size,
      firstSeen: days[0],
      lastSeen: days[days.length - 1],
      mistagged: oneDay.length,
      alsoIn: groups.filter((g) => readAs(g, notes.oneDayMove) > 0).map((g) => g.cause),
      ids: oneDay.map((r) => r.id),
    });
  }
  return { merged, rows };
}
