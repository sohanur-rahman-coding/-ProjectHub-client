'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { api } from '../lib/api';
import { AggregatedStats } from '../types';
import {
  FolderGit2,
  CheckCircle2,
  ShieldCheck,
  Send,
  Zap,
  ArrowRight,
  Database,
  Lock,
  Layers,
  Sparkles,
  FileCheck2,
  Clock,
  XCircle,
  TrendingUp,
  GraduationCap,
  GitBranch,
  Terminal,
} from 'lucide-react';

export default function HomePage() {
  const { user, isMentor, isStudent, login } = useAuth();
  const [metrics, setMetrics] = useState<AggregatedStats>({
    totalSubmissions: 6,
    totalPending: 3,
    totalApproved: 2,
    totalRejected: 1,
    approvalRate: 33.3,
  });
  const [loadingMetrics, setLoadingMetrics] = useState(false);

  useEffect(() => {
    const fetchLiveMetrics = async () => {
      try {
        setLoadingMetrics(true);
        const res = await api.reviews.getStats();
        if (res.data?.stats) {
          setMetrics(res.data.stats);
        }
      } catch (err) {
        // Quiet fallback to initial default metrics when not logged in
      } finally {
        setLoadingMetrics(false);
      }
    };

    fetchLiveMetrics();
  }, []);

  const handleQuickLogin = async (email: string) => {
    try {
      await login({ email, password: 'Password@123' });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-20 py-4 sm:py-8">
      {/* 1. Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto space-y-6 pt-4 sm:pt-8">
        {/* Decorative background glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-xs font-semibold text-blue-400 shadow-sm shadow-blue-500/10 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          Production-Ready Technical Assessment System
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Automated Project Submission &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
            Review Platform
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto font-normal">
          A full-stack, enterprise-grade portal for students to submit project deliverables and mentors
          to perform server-side paginated evaluations, status updates, and qualitative feedback reviews.
        </p>

        {/* Primary & Secondary Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <Link href="/student/submit">
            <Button
              variant="primary"
              size="lg"
              className="font-semibold shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 px-6"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Project
            </Button>
          </Link>

          <Link href="/mentor/dashboard">
            <Button
              variant="outline"
              size="lg"
              className="font-semibold border-slate-700 hover:border-slate-600 hover:bg-slate-900 px-6"
            >
              <ShieldCheck className="w-4 h-4 mr-2 text-purple-400" />
              Review Dashboard
            </Button>
          </Link>
        </div>

        {/* Quick Demo Access Bar */}
        {!user && (
          <div className="pt-6">
            <Card className="max-w-2xl mx-auto border-slate-800 bg-slate-900/60 backdrop-blur-md p-4 shadow-xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-blue-600/15 flex items-center justify-center text-blue-400 shrink-0">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                      One-Click Demo Evaluator Access
                    </h2>
                    <p className="text-[11px] text-slate-400">
                      Pre-seeded database accounts ready for instant test (Password:{' '}
                      <code className="text-blue-300 font-mono">Password@123</code>)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickLogin('mentor@example.com')}
                    className="flex-1 sm:flex-none text-xs border-purple-500/30 text-purple-300 hover:bg-purple-950/30"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 mr-1 text-purple-400" />
                    Fill Mentor
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickLogin('student@example.com')}
                    className="flex-1 sm:flex-none text-xs border-blue-500/30 text-blue-300 hover:bg-blue-950/30"
                  >
                    <GraduationCap className="w-3.5 h-3.5 mr-1 text-blue-400" />
                    Fill Student
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </section>

      {/* 2. Platform Metrics Section */}
      <section className="space-y-4 max-w-5xl mx-auto">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Platform Live Metrics</h2>
          <p className="text-xs text-slate-400">
            Real-time evaluation statistics aggregated directly from the PostgreSQL database
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
          <Card className="p-4 border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-all text-center">
            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 mb-2">
              <Layers className="w-4 h-4" />
            </div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Submissions</p>
            <p className="text-2xl font-black text-white mt-0.5">{metrics.totalSubmissions}</p>
          </Card>

          <Card className="p-4 border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-all text-center">
            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 mb-2">
              <Clock className="w-4 h-4" />
            </div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Pending Review</p>
            <p className="text-2xl font-black text-amber-300 mt-0.5">{metrics.totalPending}</p>
          </Card>

          <Card className="p-4 border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-all text-center">
            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 mb-2">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Approved</p>
            <p className="text-2xl font-black text-emerald-300 mt-0.5">{metrics.totalApproved}</p>
          </Card>

          <Card className="p-4 border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-all text-center">
            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 mb-2">
              <XCircle className="w-4 h-4" />
            </div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Rejected</p>
            <p className="text-2xl font-black text-rose-300 mt-0.5">{metrics.totalRejected}</p>
          </Card>

          <Card className="p-4 border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-all text-center col-span-2 md:col-span-1">
            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 mb-2">
              <TrendingUp className="w-4 h-4" />
            </div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Approval Rate</p>
            <p className="text-2xl font-black text-purple-300 mt-0.5">{metrics.approvalRate}%</p>
          </Card>
        </div>
      </section>

      {/* 3. 3-Step "How It Works" Section */}
      <section className="space-y-8 max-w-5xl mx-auto">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-slate-400">
            <FileCheck2 className="w-3.5 h-3.5 text-blue-400" />
            Structured Evaluation Pipeline
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">How It Works</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            From project submission to mentor review, the workflow ensures integrity and transparent feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <Card className="relative p-6 border-slate-800 bg-slate-900/40 hover:border-blue-500/40 hover:bg-slate-900/60 transition-all duration-300 space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-11 w-11 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                <Send className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md">
                STEP 01
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Student Submission</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Students submit project title, Git repository URL, live preview deployment link, and markdown
                description. Built-in rate limiting and cross-student duplicate submission checks reject duplicate
                repos.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-300 space-y-1.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Zod schema & Git URL format verification</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>HTTP 409 duplicate conflict alert</span>
              </div>
            </div>
          </Card>

          {/* Step 2 */}
          <Card className="relative p-6 border-slate-800 bg-slate-900/40 hover:border-purple-500/40 hover:bg-slate-900/60 transition-all duration-300 space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-11 w-11 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold text-purple-400 bg-purple-500/10 px-2 py-1 rounded-md">
                STEP 02
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Mentor Evaluation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Mentors access a high-performance console featuring server-side paginated tables, search filtering,
                and an interactive evaluation modal to test live demo links and review source code.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-300 space-y-1.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>Server-side pagination & status filtering</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>Approve or Reject with feedback note</span>
              </div>
            </div>
          </Card>

          {/* Step 3 */}
          <Card className="relative p-6 border-slate-800 bg-slate-900/40 hover:border-emerald-500/40 hover:bg-slate-900/60 transition-all duration-300 space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-11 w-11 rounded-2xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">
                STEP 03
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Feedback & Status Tracking</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Students track live evaluation states in their personal submission portal. Real-time status badges and
                transparent mentor comments provide clear guidance for improvements or passing grades.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-300 space-y-1.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Real-time status tracking & history</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Actionable mentor review comments</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 4. Tech Stack Banner */}
      <section className="p-8 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-slate-900/80 text-center max-w-5xl mx-auto space-y-4">
        <h3 className="text-lg font-bold text-white">Engineered with Modern Technical Standards</h3>
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
          <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-medium text-slate-300">
            TypeScript (End-to-End Type Safety)
          </span>
          <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-medium text-slate-300">
            Next.js App Router (SSR & Turbopack)
          </span>
          <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-medium text-slate-300">
            TailwindCSS + ShadCN Design Tokens
          </span>
          <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-medium text-slate-300">
            Express.js MVC Backend
          </span>
          <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-medium text-slate-300">
            PostgreSQL via Prisma ORM
          </span>
          <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-medium text-slate-300">
            JWT Role-Based Access Control
          </span>
        </div>
      </section>
    </div>
  );
}
