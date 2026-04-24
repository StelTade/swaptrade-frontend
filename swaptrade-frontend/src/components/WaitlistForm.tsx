'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

interface WaitlistFormProps {
  onSuccess: (userId: string, referralCode: string | null) => void;
  referralCode?: string;
}

interface FormErrors {
  email?: string;
  name?: string;
  submit?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WaitlistForm({ onSuccess, referralCode }: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const csrfRef = useRef<string | null>(null);

  useEffect(() => {
    fetch('/api/csrf', { cache: 'no-store' })
      .then(async (res) => {
        if (!res.ok) return;
        const data = (await res.json().catch(() => null)) as { token?: string } | null;
        if (data?.token) csrfRef.current = data.token;
      })
      .catch(() => {});
  }, []);

  const validateEmail = (val: string) => {
    if (!val.trim()) return 'Email address is required';
    if (!EMAIL_REGEX.test(val)) return 'Please enter a valid email address';
    return undefined;
  };

  const handleBlur = useCallback((field: string, value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === 'email') {
      const err = validateEmail(value);
      setErrors((prev) => ({ ...prev, email: err }));
    }
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const emailErr = validateEmail(email);
      if (emailErr) {
        setErrors({ email: emailErr });
        setTouched({ email: true });
        return;
      }

      setIsLoading(true);
      setErrors({});

      try {
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (csrfRef.current) headers['x-csrf-token'] = csrfRef.current;

        const res = await fetch('/api/waitlist', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            email: email.trim(),
            name: name.trim() || undefined,
            referralCode: referralCode || undefined,
          }),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          throw new Error(data.message || 'Failed to join waitlist. Please try again.');
        }

        onSuccess(data.user?.id ?? '', data.myReferralCode ?? null);
      } catch (err) {
        setErrors({
          submit: err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [email, name, referralCode, onSuccess]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-4"
      aria-label="Waitlist signup form"
      noValidate
    >
      <div>
        <label
          htmlFor="wl-email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Email address <span className="text-red-500" aria-hidden="true">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <input
          id="wl-email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          onBlur={(e) => handleBlur('email', e.target.value)}
          disabled={isLoading}
          required
          aria-required="true"
          aria-invalid={touched.email && !!errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'wl-email-error' : undefined}
          placeholder="you@example.com"
          className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${
            touched.email && errors.email
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:ring-[#16a34a] focus:border-[#16a34a]'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        />
        {touched.email && errors.email && (
          <p id="wl-email-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="wl-name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Name <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          id="wl-name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
          placeholder="Your name"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16a34a] focus:border-[#16a34a] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {errors.submit && (
        <div
          className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
          role="alert"
          aria-live="assertive"
        >
          <p className="text-sm text-red-600 dark:text-red-400">{errors.submit}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        aria-disabled={isLoading}
        className="w-full inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-[#16a34a] hover:bg-[#15803d] rounded-lg transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16a34a] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Joining…
          </>
        ) : (
          'Join Waitlist'
        )}
      </button>

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </form>
  );
}
