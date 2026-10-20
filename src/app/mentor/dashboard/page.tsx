'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { StatsCards } from '../../../components/mentor/StatsCards';
import { ReviewTable } from '../../../components/mentor/ReviewTable';
import { api } from '../../../lib/api';
import { AggregatedStats } from '../../../types';
import { ShieldCheck, RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export default function MentorDashboardPage() {
  const { user, isMentor, isLoading } = useAuth();
  const router = useRouter();

  const [stats, setStats] = useState<AggregatedStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  const fetchStats = useCallback(async () => {
    setLoadingStats(true);
    try {
      const res = await api.reviews.getStats();
      if (res.data?.stats) {
        setStats(res.data.stats);
      }
    } catch (err) {
      console.error('Failed to fetch review statistics:', err);
    } finally {
      setLoadingStats(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/login');
      } else if (isMentor) {
        fetchStats();
      }
    }
  }, [user, isMentor, isLoading, router, fetchStats]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-3">
        <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="text-xs text-slate-400">Loading mentor console...</p>
      </div>
    );
  }

  // Role Guard Check
  if (user && !isMentor) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-white">Mentor Access Required</h2>
        <p className="text-xs text-slate-400">
          You are currently signed in with a <span className="text-blue-400 font-semibold">Student</span> role.
          The Review Dashboard is restricted to mentors and administrators.
        </p>
        <div className="pt-2">
          <Button variant="primary" size="md" onClick={() => router.push('/student/submit')}>
            Go to Student Submission Portal
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-purple-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Mentor Review Console</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Review submitted student projects, inspect Git repositories, and record official evaluation results.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={fetchStats}>
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            Refresh Metrics
          </Button>
        </div>
      </div>

      {/* Aggregated Statistics */}
      <StatsCards stats={stats} loading={loadingStats} />

      {/* Main Review Data Table */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Project Submissions Queue</h2>
          <span className="text-xs text-slate-400">Server-side paginated & filtered</span>
        </div>
        <ReviewTable onDataChange={fetchStats} />
      </div>
    </div>
  );
}
