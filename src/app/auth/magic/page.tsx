"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function MagicAuthPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const router = useRouter();
  const params = useSearchParams();

  // If token present in URL, attempt verify
  const token = params.get('token');
  if (typeof window !== 'undefined' && token) {
    (async () => {
      try {
        const res = await fetch(`/api/auth/magic/verify?token=${encodeURIComponent(token)}`);
        if (!res.ok) throw new Error('Invalid token');
        const data = await res.json();
        if (data?.userId) {
          localStorage.setItem('swaptrade_user_id', data.userId);
          setStatus('Signed in — redirecting...');
          setTimeout(() => router.push('/dashboard'), 800);
        }
      } catch (err) {
        setStatus('Magic link invalid or expired.');
      }
    })();
  }

  async function requestLink(e: React.FormEvent) {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch('/api/auth/magic/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('Magic link sent — check your email.');
    } catch {
      setStatus('Failed to send link.');
    }
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Magic Link Login</h2>
      <form onSubmit={requestLink} className="space-y-4">
        <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded" />
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#16a34a] text-white rounded">Send Magic Link</button>
          <a href="/" className="px-4 py-2 border rounded">Back</a>
        </div>
        {status && <p className="text-sm text-gray-600">{status}</p>}
      </form>
    </main>
  );
}
