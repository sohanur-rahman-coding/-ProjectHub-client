'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { api } from '../lib/api';
import { AggregatedStats, SubmissionStatus } from '../types';
import {
  FolderGit2,
  CheckCircle2,
  ShieldCheck,
  Send,
  ArrowRight,
  Clock,
  XCircle,
  TrendingUp,
  GraduationCap,
  GitBranch,
  ExternalLink,
  RotateCcw,
  Check,
  Sparkles,
  Layers,
  Search,
  MessageSquare,
  FileCheck,
} from 'lucide-react';

export default function HomePage() {
  const { user, login } = useAuth();
  const [metrics, setMetrics] = useState<AggregatedStats>({
    totalSubmissions: 6,
    totalPending: 3,
    totalApproved: 2,
    totalRejected: 1,
    approvalRate: 33.3,
  });

  // Interactive Live Preview State
  const [activeTab, setActiveTab] = useState<'mentor' | 'student'>('mentor');
  const [mockStatus, setMockStatus] = useState<SubmissionStatus>('APPROVED');
  const [mockFeedback, setMockFeedback] = useState(
    'Meets all project requirements. Well-structured components, clean error handling, and responsive layout across mobile and desktop.',
  );
  const [isCopiedMockRepo, setIsCopiedMockRepo] = useState(false);

  useEffect(() => {
    const fetchLiveMetrics = async () => {
      try {
        const res = await api.reviews.getStats();
        if (res.data?.stats) {
          setMetrics(res.data.stats);
        }
      } catch (err) {
        // Fallback default stats
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
    navigator.clipboard.writeText('https://github.com/sarahchen/taskflow-workspace');
    setIsCopiedMockRepo(true);
    setTimeout(() => setIsCopiedMockRepo(false), 2000);
  };

  return (
    <div className="space-y-24 py-6 sm:py-12">
      {/* 1. HERO SECTION */}
      <section className="relative text-center max-w-4xl mx-auto space-y-8">
        {/* Ambient lighting glow */}
        <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[38rem] h-[20rem] bg-gradient-to-tr from-blue-600/15 via-indigo-600/10 to-purple-600/15 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 text-xs font-medium text-slate-300 shadow-sm backdrop-blur-md">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Assignment Submission & Review Dashboard</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            A simpler, structured way to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-purple-300">
              review student projects.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto font-normal">
            ProjectHub connects students and instructors in one shared workflow. Students submit their repositories and live links, while mentors inspect code, test demos, and deliver clear, actionable feedback.
          </p>
        </div>

        {/* Primary Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <Link href="/student/submit">
            <Button
              variant="primary"
              size="lg"
              className="h-11 px-6 text-sm font-semibold shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all rounded-xl"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit a Project
            </Button>
          </Link>

          <Link href="/mentor/dashboard">
            <Button
              variant="outline"
              size="lg"
              className="h-11 px-6 text-sm font-semibold border-slate-700/80 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:scale-[1.02] active:scale-[0.98] transition-all rounded-xl"
            >
              <ShieldCheck className="w-4 h-4 mr-2 text-purple-400" />
              Review Submissions
            </Button>
          </Link>
        </div>

        {/* Demo Login Quick Access */}
        {!user && (
          <div className="pt-2 max-w-xl mx-auto">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
              <div>
                <span className="text-xs font-semibold text-white block">Try the Demo</span>
                <span className="text-[11px] text-slate-400 font-normal">
                  Log in instantly with password <code className="text-slate-300 font-mono">Password@123</code>
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('mentor@example.com')}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  Mentor Account
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('student@example.com')}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 transition-colors"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                  Student Account
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. INTERACTIVE PRODUCT PREVIEW */}
        <div className="pt-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden text-left">
            {/* Window Header */}
            <div className="px-5 py-3 border-b border-slate-800 bg-slate-950/60 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-700 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-700 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-700 inline-block" />
                <span className="text-xs text-slate-400 font-medium ml-2">Review Studio Preview</span>
              </div>

              {/* View Selector Tabs */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setActiveTab('mentor')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    activeTab === 'mentor'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Mentor View
                </button>
                <button
                  onClick={() => setActiveTab('student')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    activeTab === 'student'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  Student View
                </button>
              </div>
            </div>

            {/* Preview Content */}
            <div className="p-6 space-y-5">
              {activeTab === 'mentor' ? (
                <div className="space-y-4">
                  {/* Submission Card Header */}
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white">Sarah Chen</span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-400">sarah.chen@student.edu</span>
                      </div>
                      <h3 className="text-base font-bold text-white">
                        TaskFlow — Collaborative Team Workspace
                      </h3>
                      <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                        A team collaboration platform featuring customizable Kanban boards, activity history, and workspace role permissions.
                      </p>
                    </div>

                    <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 shrink-0">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider border ${
                          mockStatus === 'APPROVED'
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                            : mockStatus === 'REJECTED'
                            ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                            : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                        }`}
                      >
                        {mockStatus === 'APPROVED' ? 'Approved' : mockStatus === 'REJECTED' ? 'Changes Requested' : 'Under Review'}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={handleCopyMockRepo}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                        >
                          {isCopiedMockRepo ? <Check className="w-3 h-3 text-emerald-400" /> : <GitBranch className="w-3 h-3 text-slate-400" />}
                          <span>{isCopiedMockRepo ? 'Copied' : 'Inspect Repo'}</span>
                        </button>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-600/10 text-blue-300 text-xs font-medium border border-blue-500/25">
                          <ExternalLink className="w-3 h-3" />
                          Live Demo
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Review Actions Simulation */}
                  <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-3">
                    <span className="text-xs font-semibold text-slate-300 block">
                      Select Review Decision:
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          setMockStatus('APPROVED');
                          setMockFeedback('Meets all project requirements. Well-structured components, clean error handling, and responsive layout across mobile and desktop.');
                        }}
                        className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border text-xs font-semibold transition-all ${
                          mockStatus === 'APPROVED'
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-sm'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Approve</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setMockStatus('REJECTED');
                          setMockFeedback('The live preview URL returns a 404 error. Please check your deployment settings and resubmit.');
                        }}
                        className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border text-xs font-semibold transition-all ${
                          mockStatus === 'REJECTED'
                            ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-sm'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                        }`}
                      >
                        <XCircle className="w-4 h-4 text-rose-400" />
                        <span>Request Changes</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setMockStatus('PENDING');
                          setMockFeedback('Assignment received and queued for review.');
                        }}
                        className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border text-xs font-semibold transition-all ${
                          mockStatus === 'PENDING'
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                        }`}
                      >
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span>Keep Under Review</span>
                      </button>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                      <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider block">
                        Mentor Feedback Note
                      </span>
                      <p className="text-slate-300 text-xs leading-relaxed">&ldquo;{mockFeedback}&rdquo;</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <h4 className="text-sm font-bold text-white">Student Submission Lifecycle</h4>
                        <p className="text-xs text-slate-400">Clear tracking through every stage of evaluation</p>
                      </div>
                      <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/25">
                        Active Workflow
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                      <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>1. Submission</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-normal">
                          Submit your repository URL, live preview link, and a brief description in seconds.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span>2. Evaluation</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-normal">
                          Instructors inspect your source code, test live features, and write helpful feedback.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-400">
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>3. Revisions</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-normal">
                          If changes are needed, update your links or code and the project automatically re-enters review.
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

      {/* 3. PLATFORM METRICS */}
      <section className="max-w-5xl mx-auto space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Live Activity
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">Evaluation Metrics</h2>
          </div>
          <p className="text-xs text-slate-400">Real-time status across active assignments</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 grid grid-cols-2 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 overflow-hidden shadow-lg">
          <div className="p-5 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Total Submissions</span>
              <Layers className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{metrics.totalSubmissions}</p>
            <p className="text-[11px] text-slate-500">All student projects</p>
          </div>

          <div className="p-5 space-y-1">
            <div className="flex items-center justify-between text-xs text-amber-400">
              <span>Under Review</span>
              <Clock className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-300 tracking-tight">{metrics.totalPending}</p>
            <p className="text-[11px] text-slate-500">Awaiting evaluation</p>
          </div>

          <div className="p-5 space-y-1">
            <div className="flex items-center justify-between text-xs text-emerald-400">
              <span>Approved</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-300 tracking-tight">{metrics.totalApproved}</p>
            <p className="text-[11px] text-slate-500">Passed evaluation</p>
          </div>

          <div className="p-5 space-y-1">
            <div className="flex items-center justify-between text-xs text-rose-400">
              <span>Changes Requested</span>
              <XCircle className="w-3.5 h-3.5 text-rose-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-rose-300 tracking-tight">{metrics.totalRejected}</p>
            <p className="text-[11px] text-slate-500">Requires updates</p>
          </div>

          <div className="p-5 space-y-2 col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between text-xs text-purple-400">
              <span>Approval Rate</span>
              <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-purple-300 tracking-tight">{metrics.approvalRate}%</p>
            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
              <div
                className="bg-purple-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(metrics.approvalRate, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE FEATURES */}
      <section className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Designed for Academic & Bootcamp Workflows
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed font-normal">
            Everything students and mentors need to manage assignment deliverables smoothly without lost links or messy spreadsheets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Feature 1 */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg space-y-3">
            <div className="h-9 w-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-4.5 h-4.5" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">Unified Review Dashboard</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              Mentors see all pending submissions in a clean, paginated console. Quickly filter by status, search by student name or project title, and evaluate submissions one by one.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg space-y-3">
            <div className="h-9 w-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <GitBranch className="w-4.5 h-4.5" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">One-Click Code & Demo Inspection</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              Direct links to GitHub, GitLab, and Bitbucket repositories alongside live deployment previews make verifying student deliverables fast and effortless.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg space-y-3">
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <MessageSquare className="w-4.5 h-4.5" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">Constructive Feedback Notes</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              Mentors provide clear evaluation notes and can choose from helpful feedback templates. Students see the feedback immediately on their project tracker.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg space-y-3">
            <div className="h-9 w-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <FileCheck className="w-4.5 h-4.5" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">Duplicate Submission Prevention</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              Built-in validation prevents accidental double submissions and ensures repository links are unique per student, maintaining clean records and grading integrity.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="relative max-w-4xl mx-auto rounded-2xl border border-slate-800 bg-gradient-to-b from-blue-950/30 via-slate-900 to-slate-950 p-8 sm:p-12 text-center space-y-5 shadow-2xl">
        <div className="space-y-2 max-w-lg mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Ready to review submissions?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
            Sign in with a demo account to test the review dashboard or create a new student account to submit your project.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <Link href="/signup">
            <Button variant="primary" size="lg" className="px-6 font-semibold rounded-xl text-sm">
              Create an Account
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>

          <Link href="/login">
            <Button variant="outline" size="lg" className="px-6 font-semibold border-slate-700 hover:bg-slate-800 text-slate-200 rounded-xl text-sm">
              Sign In
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
