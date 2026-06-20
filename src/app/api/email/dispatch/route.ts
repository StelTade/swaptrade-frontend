import { NextResponse } from 'next/server';
import { fetchDueEmailJobs, sendJobUsingProvider } from '@/lib/onboardingEmails';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const jobs = await fetchDueEmailJobs(100);
    const results = [] as Array<{ id: string; ok: boolean }>;
    for (const job of jobs) {
      try {
        const ok = await sendJobUsingProvider(job);
        results.push({ id: job.id, ok: Boolean(ok) });
      } catch (err) {
        results.push({ id: job.id, ok: false });
      }
    }

    return NextResponse.json({ processed: results.length, results });
  } catch (err) {
    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
  }
}
