'use client';

import React, { useEffect, useState } from 'react';

export default function DiscordCommunityCTA({ userId, isPremium }: { userId?: string; isPremium?: boolean }) {
  const [memberCount, setMemberCount] = useState<number | null>(null);
  const [events, setEvents] = useState<Array<{ id: string; title: string; time: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      fetch('/api/discord/stats').then((r) => r.ok ? r.json() : Promise.reject()).catch(() => null),
      fetch('/api/discord/events').then((r) => r.ok ? r.json() : Promise.reject()).catch(() => ({ events: [] })),
    ]).then(([stats, ev]) => {
      if (!mounted) return;
      setMemberCount(stats?.memberCount ?? null);
      setEvents(ev?.events ?? []);
      setLoading(false);
    });

    return () => { mounted = false; };
  }, []);

  const connectDiscord = () => {
    // redirect to server OAuth start
    window.location.href = '/api/discord/auth';
  };

  return (
    <section className="p-4 rounded-lg border border-gray-200 bg-white max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Join our Discord community</h3>
          <p className="text-sm text-gray-600">Connect with fellow waitlist members, get updates, and join AMAs.</p>
        </div>
        <div>
          <button
            onClick={connectDiscord}
            className="px-4 py-2 rounded bg-indigo-600 text-white"
          >Connect Discord</button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-3 rounded border border-gray-100">
          <p className="text-xs text-gray-500">Members</p>
          <p className="text-xl font-bold">{loading ? '…' : (memberCount ?? 'Unknown')}</p>
        </div>

        <div className="p-3 rounded border border-gray-100 col-span-2">
          <p className="text-xs text-gray-500">Upcoming events</p>
          {events.length === 0 ? (
            <p className="text-sm text-gray-600">No upcoming events. Check back later.</p>
          ) : (
            <ul className="mt-2 text-sm space-y-1">
              {events.map((e) => (
                <li key={e.id} className="flex justify-between">
                  <span>{e.title}</span>
                  <span className="text-gray-500">{new Date(e.time).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {isPremium && (
        <div className="mt-4 p-3 rounded border border-yellow-100 bg-yellow-50">
          <p className="text-sm">As a Premium member you'll receive the <strong>Premium Waitlist</strong> Discord role automatically when you connect.</p>
        </div>
      )}
    </section>
  );
}
