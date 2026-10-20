'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
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
} from 'lucide-react';

export default function HomePage() {
  const { user, isMentor, isStudent, login } = useAuth();

  const handleQuickLogin = async (email: string) => {
    try {
      await login({ email, password: 'Password@123' });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-16 py-6 sm:py-12">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
          <Zap className="w-3.5 h-3.5 text-blue-400" />
          Full-Stack Technical Assessment Dashboard
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Seamless Project Submissions & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Mentor Evaluations</span>
        </h1>

        <p className="text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Built with TypeScript, Next.js, Express.js, and PostgreSQL via Prisma ORM. Featuring JWT
          Role-Based Access Control, server-side paginated review queues, and spam-protected submission pipelines.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {user ? (
            isMentor ? (
              <Link href="/mentor/dashboard">
                <Button variant="primary" size="lg">
                  Go to Mentor Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <Link href="/student/submit">
                <Button variant="primary" size="lg">
                  Submit a Project <Send className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )
          ) : (
            <>
              <Link href="/login">
                <Button variant="primary" size="lg">
                  Get Started <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" size="lg">
                  Create Student Account
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Quick Demo Access Bar */}
      {!user && (
        <Card className="max-w-3xl mx-auto border-blue-500/30 bg-blue-950/20 backdrop-blur-md p-5 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold text-white">Instant Demo Evaluator Access</h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                One-click test logins with pre-seeded database accounts (Password: <code className="text-blue-300 font-mono">Password@123</code>)
              </p>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleQuickLogin('mentor@example.com')}
                className="flex-1 sm:flex-none border-purple-500/40 text-purple-300 hover:bg-purple-900/30"
              >
                Log in as Mentor
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleQuickLogin('student@example.com')}
                className="flex-1 sm:flex-none border-blue-500/40 text-blue-300 hover:bg-blue-900/30"
              >
                Log in as Student
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <Card className="border-slate-800 bg-slate-900/50 p-6 space-y-3">
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Send className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">1. Submission Portal</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Students submit project details (name, GitHub repo, live deployment link, and markdown description).
            Built-in rate limiting and database-level duplicate prevention.
          </p>
          <ul className="text-xs text-slate-300 space-y-1.5 pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              Duplicate repo URL rejection
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              Spam protection rate limiter
            </li>
          </ul>
        </Card>

        <Card className="border-slate-800 bg-slate-900/50 p-6 space-y-3">
          <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">2. Mentor Review Dashboard</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            High-efficiency review console featuring server-side paginated data table, server-side status filters,
            and aggregated statistics for pending, approved, and rejected projects.
          </p>
          <ul className="text-xs text-slate-300 space-y-1.5 pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              Server-side pagination & filtering
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              Aggregated real-time metrics
            </li>
          </ul>
        </Card>

        <Card className="border-slate-800 bg-slate-900/50 p-6 space-y-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">3. Role-Based Auth & DB</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            JWT Role-Based Access Control enforcing strict authorization between Students and Mentors.
            PostgreSQL database modeled and queried using Prisma ORM with automated seeding.
          </p>
          <ul className="text-xs text-slate-300 space-y-1.5 pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              Prisma ORM + PostgreSQL
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              Bcrypt hashing & signed JWT tokens
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
