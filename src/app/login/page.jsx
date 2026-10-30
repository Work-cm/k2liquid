'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
function LoginRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Get all current query parameters
    const params = new URLSearchParams();
    searchParams.forEach((value, key) => {
      params.append(key, value);
    });
    
    // Redirect to the actual login page with all query parameters
    router.replace('/');
  }, [router, searchParams]);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-night-900">
      <div className="text-center">
        <span className="loader mx-auto mb-4 h-10 w-10" />
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-bone-muted">Redirecting to login...</p>
      </div>
    </div>
  );
}

export default function LoginRedirect() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-night-900">
        <span className="loader h-10 w-10" />
      </div>
    }>
      <LoginRedirectContent />
    </Suspense>
  );
}
