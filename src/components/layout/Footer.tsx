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
  Copy,
  Check,
  GraduationCap,
  Sparkles,
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
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <FolderGit2 className="h-4.5 w-4.5 text-white" />
              </div>
              <div>
                <span className="text-base font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  ProjectHub
                </span>
                <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-500">
                  Assignment Review Platform
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              A streamlined platform for student assignment submissions, structured code evaluations, and constructive mentor feedback.
            </p>

            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-slate-300 font-medium">Platform Operational</span>
              </div>
              <span className="text-slate-500 text-[10px]">Real-Time Sync</span>
            </div>
          </div>

          {/* Col 2: Student Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
              For Students
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/student/submit" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-blue-400" />
                  Submit an Assignment
                </Link>
              </li>
              <li>
                <Link
                  href="/student/my-projects"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <FolderGit2 className="w-3.5 h-3.5 text-blue-400" />
                  My Submissions & Feedback
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-white transition-colors">
                  Create Student Account
                </Link>
              </li>
              <li>
                <span className="text-[11px] text-slate-500 block leading-relaxed">
                  Track your project status in real time and easily resubmit updates when requested.
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Mentor Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              For Mentors & Reviewers
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/mentor/dashboard"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-purple-400" />
                  Review Dashboard
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <LogIn className="w-3.5 h-3.5 text-slate-400" />
                  Sign In to Review
                </Link>
              </li>
              <li>
                <span className="text-[11px] text-slate-500 block leading-relaxed">
                  Fast repository access, live demo testing, and standardized evaluation notes.
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Demo Access */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Explore Demo Accounts
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2.5">
              <p className="text-[11px] text-slate-400">
                Quick test credentials:
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
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <p>© {new Date().getFullYear()} ProjectHub. Designed for academic and bootcamp project evaluation.</p>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hover:text-slate-400 transition-colors">
              Sign In
            </Link>
            <Link href="/signup" className="hover:text-slate-400 transition-colors">
              Register
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
