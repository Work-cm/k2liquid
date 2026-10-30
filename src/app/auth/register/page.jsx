'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { useAuth } from '@/components/auth/AuthProvider';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    router.replace('/');
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    // Validate password strength
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const result = await register({ name, email, password });
      
      if (result.success) {
        toast.success('Registration successful!');
        router.push('/');
      } else {
        toast.error(result.message || 'Registration failed');
      }
    } catch (error) {
      toast.error('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-night-900 px-4 py-20">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="tag mb-4">account.register</p>
          <h1 className="h-display text-3xl">Create an account</h1>
          <p className="mt-2 text-sm text-bone-muted">Join K2LiquidStore for premium K2 paper, spray and powder</p>
        </div>

        <div className="cell p-7 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="field-label">Full name</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaUser className="text-xs text-bone-faint" />
                </div>
                <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required
                  className="field pl-10"
                  placeholder="John Doe" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="field-label">Email address</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaEnvelope className="text-xs text-bone-faint" />
                </div>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="field pl-10"
                  placeholder="your@email.com" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="field-label">Password</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaLock className="text-xs text-bone-faint" />
                </div>
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                  className="field pl-10"
                  placeholder="Min. 6 characters" />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="field-label">Confirm password</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaLock className="text-xs text-bone-faint" />
                </div>
                <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
                  className="field pl-10"
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-volt w-full disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? <span className="loader h-4 w-4" /> : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-bone-muted">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-medium text-volt transition-colors hover:text-bone">Sign in</Link>
          </p>
        </div>

        <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint">
          By registering you agree to our{' '}
          <Link href="/terms" className="transition-colors hover:text-volt">Terms</Link> &amp;{' '}
          <Link href="/privacy" className="transition-colors hover:text-volt">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
