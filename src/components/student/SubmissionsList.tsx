'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '../../lib/api';
import { ProjectSubmission } from '../../types';
import { StatusBadge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { formatDate } from '../../lib/utils';
import { UpdateSubmissionModal } from './UpdateSubmissionModal';
import { toast } from 'sonner';
import {
  ExternalLink,
  GitBranch,
  MessageSquareQuote,
  Clock,
  PlusCircle,
  Inbox,
  RefreshCw,
  Edit,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export const SubmissionsList: React.FC = () => {
  const [submissions, setSubmissions] = useState<ProjectSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<ProjectSubmission | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await api.submissions.getMySubmissions();
      setSubmissions(res.data?.submissions || []);
    } catch (err) {
      console.error('Failed to fetch personal submissions:', err);
      toast.error('Could not load project submissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleOpenUpdate = (sub: ProjectSubmission) => {
    setSelectedSubmission(sub);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateSuccess = (updated: ProjectSubmission) => {
    setSubmissions((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
  };

  const handleCopyRepo = (repoUrl: string, id: string) => {
    navigator.clipboard.writeText(repoUrl);
    setCopiedId(id);
    toast.success('Repository URL copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-3">
        <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="text-xs text-slate-400">Loading your project submissions...</p>
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
          You haven&apos;t submitted any projects for evaluation. When you submit a project, its evaluation status and
          mentor feedback will appear here in real time.
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
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">My Project Submissions</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Track evaluation status, inspect mentor notes, and update project deliverables anytime.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={fetchSubmissions} className="text-xs">
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            Refresh
          </Button>
          <Link href="/student/submit">
            <Button variant="primary" size="sm" className="text-xs font-semibold shadow-sm">
              <PlusCircle className="w-3.5 h-3.5 mr-1.5" />
              New Submission
            </Button>
          </Link>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-5">
        {submissions.map((sub) => {
          const isPending = sub.status === 'PENDING';
          const isApproved = sub.status === 'APPROVED';
          const isRejected = sub.status === 'REJECTED';

          return (
            <Card
              key={sub.id}
              className="border-slate-800/90 bg-slate-900/60 hover:border-slate-700/80 transition-all p-5 shadow-lg group relative overflow-hidden"
            >
              {/* Subtle accent border on left based on status */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 ${
                  isApproved ? 'bg-emerald-500' : isRejected ? 'bg-rose-500' : 'bg-amber-500'
                }`}
              />

              {/* Top Row: Title, Badge, Date & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                      {sub.projectName}
                    </h3>
                    <StatusBadge status={sub.status} />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      Submitted {formatDate(sub.createdAt)}
                    </span>
                    {sub.reviewedAt && (
                      <span className="text-slate-500">• Evaluated {formatDate(sub.reviewedAt)}</span>
                    )}
                  </div>
                </div>

                {/* Top Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenUpdate(sub)}
                    className="text-xs font-semibold border-slate-700 hover:border-slate-600 bg-slate-900/80"
                  >
                    <Edit className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
                    Update Deliverables
                  </Button>
                </div>
              </div>

              {/* Middle Row: Evaluation Stepper UX Indicator */}
              <div className="py-3 px-3.5 my-3 rounded-xl bg-slate-950/60 border border-slate-800/60 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px]">
                    ✓
                  </div>
                  <span className="font-medium text-slate-300">1. Deliverables Submitted</span>
                </div>

                <div className="h-0.5 flex-1 bg-slate-800 mx-2 hidden sm:block" />

                <div className="flex items-center gap-2">
                  <div
                    className={`h-5 w-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                      isPending
                        ? 'bg-amber-500/20 text-amber-300 animate-pulse'
                        : 'bg-emerald-500/20 text-emerald-400'
                    }`}
                  >
                    {isPending ? '⏳' : '✓'}
                  </div>
                  <span className={`font-medium ${isPending ? 'text-amber-300' : 'text-slate-300'}`}>
                    2. Mentor Evaluation
                  </span>
                </div>

                <div className="h-0.5 flex-1 bg-slate-800 mx-2 hidden sm:block" />

                <div className="flex items-center gap-2">
                  <div
                    className={`h-5 w-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                      isApproved
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : isRejected
                        ? 'bg-rose-500/20 text-rose-400'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {isApproved ? '★' : isRejected ? '!' : '3'}
                  </div>
                  <span
                    className={`font-semibold ${
                      isApproved ? 'text-emerald-300' : isRejected ? 'text-rose-300' : 'text-slate-500'
                    }`}
                  >
                    {isApproved ? 'Passed Assessment' : isRejected ? 'Revisions Requested' : 'Final Decision'}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">{sub.description}</p>

              {/* Links Toolbar */}
              <div className="flex flex-wrap items-center gap-2 pt-3">
                <a
                  href={sub.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                >
                  <GitBranch className="w-3.5 h-3.5 text-slate-400" />
                  Source Code
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>

                <button
                  type="button"
                  onClick={() => handleCopyRepo(sub.repoUrl, sub.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Copy repository link"
                >
                  {copiedId === sub.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                  )}
                  <span>{copiedId === sub.id ? 'Copied' : 'Copy'}</span>
                </button>

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

              {/* Mentor Review Feedback Box */}
              {sub.reviewFeedback && (
                <div
                  className={`mt-4 p-4 rounded-xl border text-xs ${
                    isApproved
                      ? 'bg-emerald-950/20 border-emerald-500/30'
                      : 'bg-rose-950/20 border-rose-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between pb-1.5">
                    <div className="flex items-center gap-2 font-semibold">
                      <MessageSquareQuote
                        className={`w-4 h-4 ${isApproved ? 'text-emerald-400' : 'text-rose-400'}`}
                      />
                      <span className={isApproved ? 'text-emerald-200' : 'text-rose-200'}>
                        {isApproved ? 'Mentor Approval Notes' : 'Mentor Revision Feedback'}
                      </span>
                      {sub.reviewedBy && (
                        <span className="text-[11px] text-slate-400 font-normal">
                          by {sub.reviewedBy.name}
                        </span>
                      )}
                    </div>

                    {isRejected && (
                      <span className="text-[10px] font-semibold text-rose-300 bg-rose-500/20 px-2 py-0.5 rounded-full border border-rose-500/30">
                        Action Required
                      </span>
                    )}
                  </div>
                  <p className="text-slate-200 italic pl-6 leading-relaxed">&ldquo;{sub.reviewFeedback}&rdquo;</p>
                  {isRejected && (
                    <div className="pl-6 pt-2">
                      <button
                        type="button"
                        onClick={() => handleOpenUpdate(sub)}
                        className="text-xs font-semibold text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1"
                      >
                        <Edit className="w-3 h-3" />
                        Click here to edit and resubmit this project
                      </button>
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Update Submission Modal */}
      <UpdateSubmissionModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        submission={selectedSubmission}
        onSuccess={handleUpdateSuccess}
      />
    </div>
  );
};
