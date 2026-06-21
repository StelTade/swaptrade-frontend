"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type Prefs = {
  frequency?: 'immediate' | 'daily' | 'weekly' | 'never';
  productUpdates?: boolean;
  community?: boolean;
  promotional?: boolean;
};

export default function PreferencesForm() {
  const params = useSearchParams();
  const emailFromQuery = params.get('email') || '';

  const [email, setEmail] = useState(emailFromQuery);
  const [prefs, setPrefs] = useState<Prefs>({ frequency: 'weekly', productUpdates: true, community: true, promotional: false });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!email) return;
    setLoading(true);
    fetch(`/api/email/preferences?email=${encodeURIComponent(email)}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data && data.preferences) setPrefs(data.preferences);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [email]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!email) {
      setMessage('Please provide your email to save preferences.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/email/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, preferences: prefs }),
      });
      if (!res.ok) throw new Error('Save failed');
      setMessage('Preferences saved.');
    } catch (err) {
      setMessage('Failed to save preferences.');
    } finally {
      setLoading(false);
    }
  }

  async function handleUnsubscribe() {
    if (!email) {
      setMessage('Please provide your email to unsubscribe.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/email/preferences/unsubscribe?email=${encodeURIComponent(email)}`);
      if (!res.ok) throw new Error('Unsubscribe failed');
      setMessage('You have been unsubscribed.');
    } catch (err) {
      setMessage('Failed to unsubscribe.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="max-w-xl mx-auto bg-white dark:bg-gray-900 border rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Email Preferences</h2>

      <label className="block text-sm mb-2">Email address</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full mb-4 px-3 py-2 border rounded bg-gray-50 dark:bg-gray-800"
      />

      <div className="mb-4">
        <label className="block text-sm mb-2">Delivery frequency</label>
        <select
          value={prefs.frequency}
          onChange={(e) => setPrefs((p) => ({ ...p, frequency: e.target.value as any }))}
          className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800"
        >
          <option value="immediate">Immediate</option>
          <option value="daily">Daily digest</option>
          <option value="weekly">Weekly digest</option>
          <option value="never">Only critical</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={!!prefs.productUpdates} onChange={(e) => setPrefs((p) => ({ ...p, productUpdates: e.target.checked }))} />
          <span className="text-sm">Product updates</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={!!prefs.community} onChange={(e) => setPrefs((p) => ({ ...p, community: e.target.checked }))} />
          <span className="text-sm">Community & events</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={!!prefs.promotional} onChange={(e) => setPrefs((p) => ({ ...p, promotional: e.target.checked }))} />
          <span className="text-sm">Promotional offers</span>
        </label>
      </div>

      {message && <p className="text-sm text-gray-600 mb-3">{message}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-[#16a34a] text-white rounded">Save</button>
        <button type="button" onClick={handleUnsubscribe} disabled={loading} className="px-4 py-2 border rounded">Unsubscribe</button>
      </div>
    </form>
  );
}
