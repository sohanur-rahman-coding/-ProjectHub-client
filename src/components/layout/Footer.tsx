import React from 'react';
import Link from 'next/link';
import {
  FolderGit2,
  ExternalLink,
  ShieldCheck,
  Send,
  LayoutDashboard,
  LogIn,
  Heart,
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950/90 text-slate-400 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-900">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <FolderGit2 className="h-4.5 w-4.5 text-white" />
              </div>
              <div>
                <span className="text-base font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  ProjectHub
                </span>
                <span className="block text-[9px] uppercase font-mono tracking-wider text-slate-500">
                  Review & Evaluation
                </span>
              </div>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              Automated project submission and evaluation platform.
            </p>
          </div>

          {/* Student Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Student Portal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/student/submit" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-blue-400" />
                  Submit New Project
                </Link>
              </li>
              <li>
                <Link
                  href="/student/my-projects"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <FolderGit2 className="w-3.5 h-3.5 text-blue-400" />
                  My Submissions
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-white transition-colors">
                  Create Student Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Mentor & Evaluation */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Evaluation Console</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/mentor/dashboard"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-purple-400" />
                  Review Queue
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <LogIn className="w-3.5 h-3.5 text-slate-400" />
                  Sign In (Evaluator)
                </Link>
              </li>
              <li>
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  JWT RBAC Protected
                </span>
              </li>
            </ul>
          </div>

         
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} ProjectHub. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-[11px] text-slate-500">
            Engineered with <Heart className="w-3 h-3 text-rose-500 fill-rose-500/30" /> for clean code assessment
          </p>
        </div>
      </div>
    </footer>
  );
};
