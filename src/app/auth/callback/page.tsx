'use client';

import React, { useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setSession } = useAuth();
  const processedRef = useRef(false);

  useEffect(() => {
    // Prevent multiple runs that cause infinite loop
    if (processedRef.current) return;

    const token = searchParams.get('token');
    const userStr = searchParams.get('user');

    if (!token || !userStr) {
      processedRef.current = true;
      toast.error('Authentication details missing. Redirecting to login...');
      window.location.href = '/login';
      return;
    }

    try {
      processedRef.current = true;
      const user = JSON.parse(userStr);
      setSession(token, user);
      toast.success(`Welcome back, ${user.name || 'User'}!`);

      // Redirect directly to Home page as requested
      setTimeout(() => {
        window.location.href = '/';
      }, 300);
    } catch (err) {
      console.error('Failed to parse user session:', err);
      toast.error('Failed to initialize session');
      window.location.href = '/login';
    }
  }, [searchParams, setSession]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
      <div className="relative">
        <div className="h-16 w-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-white tracking-tight">Signed in with Google</h2>
        <p className="text-xs text-slate-400">Redirecting you to the home page...</p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}
