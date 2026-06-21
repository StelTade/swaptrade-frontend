import PreferencesForm from './PreferencesForm';

export const metadata = {
  title: 'Email Preferences - SwapTrade',
};

export default function Page() {
  return (
    <main className="p-6">
      <div className="max-w-3xl mx-auto">
        <PreferencesForm />
      </div>
    </main>
  );
}
