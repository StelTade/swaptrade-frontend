'use client';

import { useState, useCallback } from 'react';

interface WaitlistFormData {
  email: string;
  name: string;
}

interface FormErrors {
  email?: string;
  name?: string;
  submit?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WaitlistForm() {
  const [formData, setFormData] = useState<WaitlistFormData>({
    email: '',
    name: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateEmail = useCallback((email: string): boolean => {
    return EMAIL_REGEX.test(email);
  }, []);

  const validateField = useCallback(
    (name: keyof WaitlistFormData, value: string): string | undefined => {
      if (name === 'email') {
        if (!value.trim()) {
          return 'Email address is required';
        }
        if (!validateEmail(value)) {
          return 'Please enter a valid email address';
        }
      }
      return undefined;
    },
    [validateEmail]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear error when user starts typing
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));

      const error = validateField(name as keyof WaitlistFormData, value);
      if (error) {
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [validateField]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Validate all fields
      const newErrors: FormErrors = {};
      const emailError = validateField('email', formData.email);
      if (emailError) {
        newErrors.email = emailError;
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setTouched({ email: true, name: true });
        return;
      }

      setIsLoading(true);
      setErrors({});

      try {
        // TODO: Replace with actual API endpoint from Issue 11
        const response = await fetch('/api/waitlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email.trim(),
            name: formData.name.trim() || undefined,
          }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.message || 'Failed to join waitlist. Please try again.');
        }

        setIsSuccess(true);
        setFormData({ email: '', name: '' });
      } catch (error) {
        setErrors({
          submit:
            error instanceof Error
              ? error.message
              : 'An unexpected error occurred. Please try again.',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [formData, validateField]
  );

  const handleReset = useCallback(() => {
    setIsSuccess(false);
    setErrors({});
    setTouched({});
  }, []);

  if (isSuccess) {
    return (
      <div
        className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center"
        role="alert"
        aria-live="polite"
      >
        <div className="flex items-center justify-center mb-3">
          <svg
            className="w-12 h-12 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
          You&apos;re on the list!
        </h3>
        <p className="text-green-700 dark:text-green-300 mb-4">
          Thank you for joining our waitlist. We&apos;ll notify you when SwapTrade is ready.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="text-sm text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1"
        >
          Join with another email
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-4"
      aria-label="Waitlist signup form"
      noValidate
    >
      <div className="space-y-4">
        <div>
          <label
            htmlFor="waitlist-email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Email address <span className="text-red-500" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            type="email"
            id="waitlist-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isLoading}
            required
            aria-required="true"
            aria-invalid={touched.email && !!errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            placeholder="you@example.com"
            className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${
              touched.email && errors.email
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-[#16a34a] focus:border-[#16a34a]'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          />
          {touched.email && errors.email && (
            <p
              id="email-error"
              className="mt-1 text-sm text-red-600 dark:text-red-400"
              role="alert"
            >
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="waitlist-name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Name <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            id="waitlist-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isLoading}
            aria-required="false"
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16a34a] focus:border-[#16a34a] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
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
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Joining...
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
