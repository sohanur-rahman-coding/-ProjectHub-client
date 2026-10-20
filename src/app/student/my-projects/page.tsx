'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { SubmissionsList } from '../../../components/student/SubmissionsList';
import { RefreshCw } from 'lucide-react';

export default function MyProjectsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-3">
        <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="text-xs text-slate-400">Loading project submissions...</p>
      </div>
    );
  }

  return (
    <div className="py-4">
      <SubmissionsList />
    </div>
  );
}
