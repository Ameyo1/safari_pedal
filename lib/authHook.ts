'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export function useAuth() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const registerAndLogin = async (name: string, email: string, password: string) => {
    setError(null);
    try {
      // 1️⃣ Register
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Registration failed');

      // 2️⃣ Auto-login
      const login = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (!login?.ok) throw new Error('Login failed');

      startTransition(() => router.push('/dashboard/logs'));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const login = async (email: string, password: string) => {
    setError(null);
    try {
      const login = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (!login?.ok) throw new Error('Invalid credentials');
      startTransition(() => router.push('/dashboard/logs'));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return { pending, error, registerAndLogin, login };
}
