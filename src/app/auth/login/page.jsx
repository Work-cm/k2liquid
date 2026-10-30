'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '@/components/auth/AuthProvider';
import toast from 'react-hot-toast';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  // Redirect if already logged in
  useEffect(() => {
    router.replace('/');
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        toast.success('Login successful!');
        router.push(redirect);
      } else {
        toast.error(result.message || 'Login failed');
      }
    } catch (error) {
      toast.error('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-night-900 px-4 py-20">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 text-center">
          <p className="tag mb-4">account.login</p>
          <h1 className="h-display text-3xl">Welcome back</h1>
          <p className="mt-2 text-sm text-bone-muted">Sign in to your account</p>
        </div>

        <div className="cell p-7 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="field-label">Email address</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaEnvelope className="text-xs text-bone-faint" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="field pl-10"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="field-label">Password</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaLock className="text-xs text-bone-faint" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="field pl-10"
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-volt w-full disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? <span className="loader h-4 w-4" /> : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-bone-muted">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="font-medium text-volt transition-colors hover:text-bone">
              Create one
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint">
          By signing in you agree to our{' '}
          <Link href="/terms" className="transition-colors hover:text-volt">Terms</Link> &amp;{' '}
          <Link href="/privacy" className="transition-colors hover:text-volt">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-night-900">
        <span className="loader h-10 w-10" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
