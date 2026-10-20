'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '../../lib/api';
import { ProjectSubmission } from '../../types';
import { StatusBadge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { formatDate } from '../../lib/utils';
import {
  ExternalLink,
  GitBranch,
  MessageSquareQuote,
  Clock,
  PlusCircle,
  Inbox,
  RefreshCw,
} from 'lucide-react';

export const SubmissionsList: React.FC = () => {
  const [submissions, setSubmissions] = useState<ProjectSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await api.submissions.getMySubmissions();
      setSubmissions(res.data?.submissions || []);
    } catch (err) {
      console.error('Failed to fetch personal submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-3">
        <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="text-sm text-slate-400">Loading your project submissions...</p>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <Card className="text-center py-16 px-6 max-w-lg mx-auto border border-dashed border-slate-800 bg-slate-900/40 shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-4 shadow-lg shadow-blue-500/10">
          <Inbox className="w-8 h-8" />
        </div>
        <CardTitle className="text-xl font-bold text-white">No project submissions yet</CardTitle>
        <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
          You haven&apos;t submitted any projects for evaluation. When you submit a project, its evaluation status and mentor feedback will appear here in real time.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link href="/student/submit">
            <Button variant="primary" size="md" className="font-semibold shadow-md shadow-blue-500/20">
              <PlusCircle className="w-4 h-4 mr-2" />
              Submit Your First Project
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2">
        <div>
          <h2 className="text-xl font-bold text-white">My Submitted Projects</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Track status updates and evaluation notes from mentors in real time.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={fetchSubmissions}>
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            Refresh
          </Button>
          <Link href="/student/submit">
            <Button variant="primary" size="sm">
              <PlusCircle className="w-3.5 h-3.5 mr-1.5" />
              New Submission
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {submissions.map((sub) => (
          <Card key={sub.id} className="border-slate-800/90 bg-slate-900/60 hover:border-slate-700/80 transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-800/60">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-bold text-white">{sub.projectName}</h3>
                  <StatusBadge status={sub.status} />
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Submitted on {formatDate(sub.createdAt)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={sub.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  Code Repo
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                <a
                  href={sub.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Preview
                </a>
              </div>
            </div>

            <p className="text-xs text-slate-300 mt-3 leading-relaxed whitespace-pre-wrap">{sub.description}</p>

            {/* Mentor Review Feedback Box */}
            {sub.reviewFeedback && (
              <div className="mt-4 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-slate-300 font-semibold mb-1">
                  <MessageSquareQuote className="w-4 h-4 text-purple-400" />
                  <span>Mentor Feedback</span>
                  {sub.reviewedBy && (
                    <span className="text-[11px] text-purple-300 font-normal">
                      by {sub.reviewedBy.name}
                    </span>
                  )}
                  {sub.reviewedAt && (
                    <span className="text-[10px] text-slate-400 font-normal ml-auto">
                      {formatDate(sub.reviewedAt)}
                    </span>
                  )}
                </div>
                <p className="text-slate-300 italic pl-6 leading-relaxed">&ldquo;{sub.reviewFeedback}&rdquo;</p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};
