import Link from "next/link";

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black text-white">
      <h1 className="text-3xl font-bold">You&apos;re offline</h1>
      <p className="text-gray-400">
        Check your connection and try again. Cached pages are still available.
      </p>
      <Link
        href="/"
        className="mt-4 rounded-lg bg-white px-6 py-2 text-sm font-medium text-black hover:bg-gray-200"
      >
        Go home
      </Link>
    </main>
  );
}
