'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FolderGit2,
  ExternalLink,
  ShieldCheck,
  Send,
  LayoutDashboard,
  LogIn,
  Heart,
  Copy,
  Check,
  GraduationCap,
  Sparkles,
  Server,
  Layers,
  RotateCcw,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Footer: React.FC = () => {
  const { login } = useAuth();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleQuickLogin = async (email: string) => {
    try {
      await login({ email, password: 'Password@123' });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/95 text-slate-400 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          {/* Col 1: Brand Info & Status */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <FolderGit2 className="h-4.5 w-4.5 text-white" />
              </div>
              <div>
                <span className="text-base font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  ProjectHub
                </span>
                <span className="block text-[9px] uppercase font-mono tracking-wider text-slate-500">
                  Review & Evaluation Platform
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Automated code submission and evaluation engine. Enforcing integrity with duplicate repo shields, multi-decision reviews, and real-time student revisions.
            </p>

            {/* Live Infrastructure Status */}
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-slate-300 font-medium">All Systems Operational</span>
              </div>
              <span className="font-mono text-slate-500 text-[10px]">Neon us-east-2</span>
            </div>

            {/* GitHub Repo Link with custom SVG */}
            <div className="pt-1">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white transition-colors text-xs font-semibold"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
                <span>View Source Repository</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Col 2: Student Portal Workflows */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
              Student Workflows
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/student/submit" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-blue-400" />
                  Submit Project Deliverable
                </Link>
              </li>
              <li>
                <Link
                  href="/student/my-projects"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <FolderGit2 className="w-3.5 h-3.5 text-blue-400" />
                  My Submissions & Status
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-white transition-colors">
                  Create Student Account
                </Link>
              </li>
              <li>
                <span className="text-[11px] text-slate-500 block leading-relaxed">
                  Automatic revision reset: Editing a rejected project moves it back to Pending.
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Evaluator & Mentor Console */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              Mentor Workspace
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/mentor/dashboard"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-purple-400" />
                  Submissions Review Queue
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <LogIn className="w-3.5 h-3.5 text-slate-400" />
                  Sign In (Mentor / Evaluator)
                </Link>
              </li>
              <li>
                <span className="text-[11px] text-slate-500 block">
                  3-Way Decision Controls: Approve, Reject, or Reset.
                </span>
              </li>
              <li>
                <span className="text-[11px] text-slate-500 block">
                  Server-side pagination and keyword filter enabled.
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Pre-Seeded Evaluator Sandbox */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Demo Evaluator Credentials
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5">
              <p className="text-[11px] text-slate-400">
                Test roles instantly without registering:
              </p>

              {/* Mentor Row */}
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/80">
                <div>
                  <span className="font-semibold text-purple-300 block">Mentor</span>
                  <span className="font-mono text-slate-400 text-[10px]">mentor@example.com</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('mentor@example.com', 'mentor')}
                  className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                  title="Copy email"
                >
                  {copiedKey === 'mentor' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Student Row */}
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/80">
                <div>
                  <span className="font-semibold text-blue-300 block">Student</span>
                  <span className="font-mono text-slate-400 text-[10px]">student@example.com</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('student@example.com', 'student')}
                  className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                  title="Copy email"
                >
                  {copiedKey === 'student' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="pt-1 text-[10px] text-slate-500">
                Password: <code className="text-slate-300 font-mono">Password@123</code>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {new Date().getFullYear()} ProjectHub Platform.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-[11px]">All submissions protected with unique SHA hash checksums.</span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">
              Next.js 14 App Router
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">
              Express MVC
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">
              PostgreSQL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
