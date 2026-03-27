import { useState } from 'react';

export interface VerificationState {
  isLoading: boolean;
  isVerified: boolean;
  error: string | null;
}

export function useEmailVerification() {
  const [state, setState] = useState<VerificationState>({
    isLoading: false,
    isVerified: false,
    error: null,
  });

  const verifyEmail = async (token: string) => {
    setState({ isLoading: true, isVerified: false, error: null });

    try {
      const response = await fetch('/api/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok) {
        setState({ isLoading: false, isVerified: true, error: null });
        return { success: true, message: data.message };
      } else {
        setState({ isLoading: false, isVerified: false, error: data.message });
        return { success: false, message: data.message };
      }
    } catch {
      const errorMessage = 'Network error. Please try again.';
      setState({ isLoading: false, isVerified: false, error: errorMessage });
      return { success: false, message: errorMessage };
    }
  };

  const resendVerification = async (email: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch('/api/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setState(prev => ({ ...prev, isLoading: false }));
        return { success: true, message: data.message };
      } else {
        setState(prev => ({ ...prev, isLoading: false, error: data.message }));
        return { success: false, message: data.message };
      }
    } catch {
      const errorMessage = 'Network error. Please try again.';
      setState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
      return { success: false, message: errorMessage };
    }
  };

  return {
    ...state,
    verifyEmail,
    resendVerification,
  };
}