'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { api } from '../lib/api';
import { AggregatedStats, SubmissionStatus } from '../types';
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
  ExternalLink,
  RotateCcw,
  Check,
  Code2,
  ChevronRight,
  ShieldAlert,
  Server,
  Activity,
  Cpu,
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

  // Interactive Live Preview Mockup State
  const [activeTab, setActiveTab] = useState<'mentor' | 'student'>('mentor');
  const [mockStatus, setMockStatus] = useState<SubmissionStatus>('APPROVED');
  const [mockFeedback, setMockFeedback] = useState(
    'Outstanding work! Clean architecture, comprehensive validation, and intuitive UX.',
  );
  const [isCopiedMockRepo, setIsCopiedMockRepo] = useState(false);

  useEffect(() => {
    const fetchLiveMetrics = async () => {
      try {
        setLoadingMetrics(true);
        const res = await api.reviews.getStats();
        if (res.data?.stats) {
          setMetrics(res.data.stats);
        }
      } catch (err) {
        // Quiet fallback to default stats if unauthenticated
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

  const handleCopyMockRepo = () => {
    navigator.clipboard.writeText('https://github.com/developer/devpulse-saas');
    setIsCopiedMockRepo(true);
    setTimeout(() => setIsCopiedMockRepo(false), 2000);
  };

  return (
    <div className="space-y-24 py-6 sm:py-12">
      {/* 1. HERO SECTION */}
      <section className="relative text-center max-w-5xl mx-auto space-y-8">
        {/* Ambient lighting glows */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[38rem] h-[22rem] bg-gradient-to-tr from-blue-600/15 via-indigo-600/15 to-purple-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* Live operational badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-semibold text-slate-200 shadow-xl backdrop-blur-xl animate-fade-in">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-400">Neon PostgreSQL Engine</span>
          <span className="h-3.5 w-px bg-slate-700" />
          <span className="text-blue-400 font-mono text-[11px]">v2.4 Active</span>
        </div>

        {/* Main Catchy Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
            Code Reviews at the Speed of Software.{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              Without the Chaos.
            </span>
          </h1>
          <p className="text-base sm:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto font-normal">
            The automated pipeline for students to submit projects and mentors to inspect repos, verify live demos, and deliver structured feedback.
          </p>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link href="/student/submit">
            <Button
              variant="primary"
              size="lg"
              className="h-12 px-7 text-sm font-bold shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Send className="w-4 h-4 mr-2.5" />
              Submit Project Deliverable
            </Button>
          </Link>

          <Link href="/mentor/dashboard">
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-7 text-sm font-bold border-slate-700/90 bg-slate-900/80 hover:bg-slate-800 hover:border-slate-600 text-slate-200 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <ShieldCheck className="w-4 h-4 mr-2.5 text-purple-400" />
              Launch Mentor Console
            </Button>
          </Link>
        </div>

        {/* One-Click Evaluator Access Bar */}
        {!user && (
          <div className="pt-2 max-w-2xl mx-auto">
            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/90 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">Instant Evaluator Access</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      Pre-Seeded
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    One-click login with password <code className="text-blue-300 font-mono">Password@123</code>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('mentor@example.com')}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 transition-all hover:scale-105"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  Mentor (Evaluator)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('student@example.com')}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 transition-all hover:scale-105"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                  Student (Submitter)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. REALISTIC INTERACTIVE PRODUCT SHOWCASE */}
        <div className="pt-8">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl overflow-hidden backdrop-blur-2xl text-left">
            {/* Window Topbar */}
            <div className="px-5 py-3.5 border-b border-slate-800/90 bg-slate-900/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="ml-3 text-xs font-mono text-slate-400 hidden sm:inline">
                  projecthub.io / live-evaluator-demo
                </span>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setActiveTab('mentor')}
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'mentor'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Mentor Studio (Try Clicking Decisions)
                </button>
                <button
                  onClick={() => setActiveTab('student')}
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'student'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  Student Progress Tracker
                </button>
              </div>
            </div>

            {/* Interactive Showcase Body */}
            <div className="p-6 sm:p-8 space-y-6 bg-gradient-to-b from-slate-900/40 via-slate-950/60 to-slate-950">
              {activeTab === 'mentor' ? (
                /* Mentor View Interactive Mockup */
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-inner">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">
                          SUBMISSION #1042
                        </span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-400">Sarah Jenkins (sarah.dev@example.com)</span>
                      </div>
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        DevPulse Cloud Infrastructure Telemetry
                      </h3>
                      <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                        Full-stack observability dashboard built with Next.js 14, TailwindCSS, Express.js microservices, and Neon PostgreSQL. Features live webhooks and interactive charts.
                      </p>
                    </div>

                    <div className="flex flex-wrap md:flex-col items-end gap-2 shrink-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">Live Status:</span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
                            mockStatus === 'APPROVED'
                              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                              : mockStatus === 'REJECTED'
                              ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                              : 'bg-amber-500/20 border-amber-500 text-amber-300'
                          }`}
                        >
                          {mockStatus}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleCopyMockRepo}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700"
                        >
                          {isCopiedMockRepo ? <Check className="w-3 h-3 text-emerald-400" /> : <GitBranch className="w-3 h-3 text-slate-400" />}
                          <span>{isCopiedMockRepo ? 'Repo Copied' : 'Inspect Code'}</span>
                        </button>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600/20 text-blue-300 text-xs border border-blue-500/30">
                          <ExternalLink className="w-3 h-3" />
                          Live Demo
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Evaluation Action Tray */}
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        Test Live Decision Switcher (Click Any Button):
                      </span>
                      <span className="text-xs text-slate-500 hidden sm:inline">
                        Instant UI mutation without full page reload
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setMockStatus('APPROVED');
                          setMockFeedback('Outstanding work! Clean architecture, comprehensive validation, and intuitive UX.');
                        }}
                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                          mockStatus === 'APPROVED'
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/20 ring-1 ring-emerald-500'
                            : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Approve Project</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setMockStatus('REJECTED');
                          setMockFeedback('The live demo link is unreachable (404 error). Please fix and update your submission.');
                        }}
                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                          mockStatus === 'REJECTED'
                            ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-md shadow-rose-500/20 ring-1 ring-rose-500'
                            : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                        }`}
                      >
                        <XCircle className="w-4 h-4 text-rose-400" />
                        <span>Request Revisions</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setMockStatus('PENDING');
                          setMockFeedback('Submission placed in queue for code audit and security verification.');
                        }}
                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                          mockStatus === 'PENDING'
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md shadow-amber-500/20 ring-1 ring-amber-500'
                            : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                        }`}
                      >
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span>Reset to Pending</span>
                      </button>
                    </div>

                    {/* Feedback Preview Box */}
                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                      <span className="text-[10px] uppercase font-mono text-slate-500 block">
                        Mentor Feedback Visible to Student:
                      </span>
                      <p className="italic text-slate-200">&ldquo;{mockFeedback}&rdquo;</p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Student View Interactive Mockup */
                <div className="space-y-6">
                  {/* 3-Step evaluation timeline */}
                  <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                      <div>
                        <h4 className="text-sm font-bold text-white">Student Submission Lifecycle</h4>
                        <p className="text-xs text-slate-400">Zero-latency state transitions directly reflected in student portal</p>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                        Active Revision Mode
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Step 1 */}
                      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>1. Submission Dispatched</span>
                        </div>
                        <p className="text-xs text-slate-400">
                          Zod schema validation passed. Repository uniqueness hash confirmed against all students.
                        </p>
                      </div>

                      {/* Step 2 */}
                      <div className="p-4 rounded-xl bg-slate-950/70 border border-blue-500/30 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                          <Activity className="w-4 h-4 animate-spin" />
                          <span>2. Mentor Evaluation</span>
                        </div>
                        <p className="text-xs text-slate-400">
                          Mentor opens full-screen evaluation studio to test live deployment & check git commit logs.
                        </p>
                      </div>

                      {/* Step 3 */}
                      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                          <RotateCcw className="w-4 h-4 text-purple-400" />
                          <span>3. Instant Resubmission</span>
                        </div>
                        <p className="text-xs text-slate-400">
                          If rejected, student clicks &ldquo;Update Deliverables&rdquo; to fix code and auto-reset status to Pending.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PLATFORM TELEMETRY METRICS BAR */}
      <section className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
              <Activity className="w-4 h-4" />
              Live Database Telemetry
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight mt-0.5">Real-time Platform Metrics</h2>
          </div>
          <p className="text-xs text-slate-400">
            Real-time data aggregated dynamically from Neon PostgreSQL via Prisma ORM
          </p>
        </div>

        {/* 5-Card High-Density Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
          <Card className="p-4 border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Submissions</span>
              <Layers className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white">{metrics.totalSubmissions}</p>
            <span className="text-[10px] text-slate-500 mt-1 block">Total student submissions</span>
          </Card>

          <Card className="p-4 border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">In Review</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-amber-300">{metrics.totalPending}</p>
            <span className="text-[10px] text-slate-500 mt-1 block">Awaiting mentor action</span>
          </Card>

          <Card className="p-4 border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Approved</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-emerald-300">{metrics.totalApproved}</p>
            <span className="text-[10px] text-slate-500 mt-1 block">Passed assessment rubric</span>
          </Card>

          <Card className="p-4 border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider">Revisions</span>
              <XCircle className="w-4 h-4 text-rose-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-rose-300">{metrics.totalRejected}</p>
            <span className="text-[10px] text-slate-500 mt-1 block">Under student revision</span>
          </Card>

          <Card className="p-4 border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider">Pass Rate</span>
              <TrendingUp className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-purple-300">{metrics.approvalRate}%</p>
            {/* Visual ratio bar */}
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(metrics.approvalRate, 100)}%` }}
              />
            </div>
          </Card>
        </div>
      </section>

      {/* 4. MODERN BENTO GRID: ARCHITECTURAL ADVANTAGES */}
      <section className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-400">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            Engineered For Scale & Academic Integrity
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built Like Modern Developer Tools
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Eliminate submission duplicates, enforce rigorous code review workflows, and guarantee high-throughput evaluation speeds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Bento Card 1: Wide Card - Evaluation Matrix */}
          <div className="md:col-span-2 p-7 rounded-3xl border border-slate-800/80 bg-slate-900/50 hover:border-slate-700 transition-all space-y-5 relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20">
                Full-Featured Evaluation
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Interactive 3-Way Review Decisions</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl">
                Mentors are never locked into accidental clicks. Evaluate with Approve, Reject, or reset to Pending. Add feedback with pre-built evaluation templates and inspect public GitHub repos with 1-click clipboard helpers.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-emerald-500/20 text-xs">
                <span className="font-bold text-emerald-400 block mb-1">✓ Approve</span>
                <span className="text-slate-400 text-[11px]">Marks passing grade & archives review notes</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-rose-500/20 text-xs">
                <span className="font-bold text-rose-400 block mb-1">✕ Reject</span>
                <span className="text-slate-400 text-[11px]">Requests targeted revisions with constructive feedback</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-amber-500/20 text-xs">
                <span className="font-bold text-amber-400 block mb-1">⏳ Pending</span>
                <span className="text-slate-400 text-[11px]">Allows undoing mistakes or requesting secondary review</span>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Duplicate Collision Shield */}
          <div className="p-7 rounded-3xl border border-slate-800/80 bg-slate-900/50 hover:border-slate-700 transition-all space-y-4">
            <div className="h-10 w-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Cross-Student Duplicate Shield</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Guarantees academic integrity. If two students attempt to submit the same repository URL, the backend triggers an instant <strong>HTTP 409 Conflict</strong>.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-rose-500/30 text-[11px] font-mono text-rose-300">
              HTTP 409: &ldquo;This repository has already been submitted by another student.&rdquo;
            </div>
          </div>

          {/* Bento Card 3: Google Identity & RBAC */}
          <div className="p-7 rounded-3xl border border-slate-800/80 bg-slate-900/50 hover:border-slate-700 transition-all space-y-4">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Lock className="w-5 h-5" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Google OAuth & JWT RBAC</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Log in seamlessly via Google Identity Services or email credentials. Strict role-based middleware guards student submission endpoints and mentor evaluation queues.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-[11px] font-mono text-blue-300">
                Google GIS 2.0
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-[11px] font-mono text-slate-300">
                JWT HttpOnly
              </span>
            </div>
          </div>

          {/* Bento Card 4: Wide Card - Server-side Pagination & Neon */}
          <div className="md:col-span-2 p-7 rounded-3xl border border-slate-800/80 bg-slate-900/50 hover:border-slate-700 transition-all space-y-5">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Database className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                Neon Cloud PostgreSQL
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Server-Side Pagination & High-Speed Filtering</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Built to handle hundreds of student deliverables simultaneously. Database queries utilize indexed search and server-side limit/offset pagination so mentors never experience browser slowdowns.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Indexed full-text query matching</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Sub-50ms query response on Neon AWS</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Rate-limited submission endpoints</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION CONVERSION BANNER */}
      <section className="relative max-w-5xl mx-auto rounded-3xl border border-slate-800 bg-gradient-to-b from-blue-950/40 via-slate-900/70 to-slate-950 p-8 sm:p-14 text-center space-y-6 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 max-w-xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Streamline Your Project Reviews?
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Jump directly into the live demo environment or connect your repository in under two minutes.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/signup">
            <Button variant="primary" size="lg" className="px-7 font-bold shadow-xl shadow-blue-600/30">
              Create Free Account
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>

          <Link href="/mentor/dashboard">
            <Button variant="outline" size="lg" className="px-7 font-bold border-slate-700 hover:bg-slate-850 text-slate-200">
              <ShieldCheck className="w-4 h-4 mr-2 text-purple-400" />
              Open Review Queue
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
