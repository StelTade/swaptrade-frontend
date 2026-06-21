import { Suspense } from 'react';
import PreferencesForm from './PreferencesForm';

export const metadata = {
  title: 'Email Preferences - SwapTrade',
};

function PreferencesSkeleton() {
  return (
    <main className="p-6">
      <div className="max-w-3xl mx-auto">
        <div>Loading...</div>
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<PreferencesSkeleton />}>
      <PreferencesForm />
    </Suspense>
  );
}