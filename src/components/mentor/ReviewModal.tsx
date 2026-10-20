'use client';

import React, { useState, useEffect } from 'react';
import { ProjectSubmission, SubmissionStatus } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import { StatusBadge } from '../ui/Badge';
import { formatDate } from '../../lib/utils';
import { api } from '../../lib/api';
import toast from 'react-hot-toast';
import {
  GitBranch,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Sparkles,
  Save,
  RotateCcw,
  Copy,
  Check,
} from 'lucide-react';

interface ReviewModalProps {
  submission: ProjectSubmission | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updated: ProjectSubmission) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  submission,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [status, setStatus] = useState<SubmissionStatus>('APPROVED');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sync state when submission opens
  useEffect(() => {
    if (submission) {
      setStatus(submission.status === 'PENDING' ? 'APPROVED' : submission.status);
      setFeedback(submission.reviewFeedback || '');
      setCopied(false);
    }
  }, [submission]);

  if (!submission) return null;

  const isUpdate = submission.status !== 'PENDING';

  const approvedTemplates = [
    'Outstanding work! Clean architecture, comprehensive validation, and intuitive UX.',
    'All rubric requirements met. Live demo runs smoothly and code is cleanly modularized.',
    'Approved with distinction: exceptional TypeScript type-safety and responsive UI.',
  ];

  const rejectedTemplates = [
    'The live demo link is unreachable (404 or connection error). Please fix and update your submission.',
    'The GitHub repository is private or inaccessible. Please make it public for evaluation.',
    'Core requirements incomplete: missing duplicate validation or rate limiting.',
  ];

  const handleCopyRepo = () => {
    navigator.clipboard.writeText(submission.repoUrl);
    setCopied(true);
    toast.success('Repository URL copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await api.reviews.updateReview(submission.id, {
        status,
        feedback: feedback.trim(),
      });

      if (res.data?.submission) {
        toast.success(
          status === 'APPROVED'
            ? 'Project approved successfully!'
            : status === 'REJECTED'
            ? 'Submission rejected with feedback notes'
            : 'Project status reset to pending'
        );
        onSuccess(res.data.submission);
        onClose();
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to update review status');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isUpdate ? 'Update Project Evaluation' : 'Evaluate Project Deliverable'}
      description={
        isUpdate
          ? `Currently ${submission.status} • Revise review decision or update feedback notes.`
          : 'Inspect student code repository, test live preview, and record evaluation decision.'
      }
      maxWidth="2xl"
    >
      <div className="space-y-4">
        {/* Project Meta Card */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 shadow-inner">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Project Deliverable</span>
              <h3 className="text-base font-bold text-white">{submission.projectName}</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Current:</span>
              <StatusBadge status={submission.status} />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1 border-t border-slate-800/60">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-slate-300 font-medium">{submission.student?.name || 'Student'}</span>
              <span className="text-slate-500">({submission.student?.email})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Submitted {formatDate(submission.createdAt)}</span>
            </div>
          </div>

          {/* Direct verification actions toolbar */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <a
              href={submission.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors border border-slate-700"
            >
              <GitBranch className="w-3.5 h-3.5 text-slate-400" />
              Inspect Code Repository
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>

            <button
              type="button"
              onClick={handleCopyRepo}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-300 transition-colors border border-slate-700/80"
              title="Copy repo URL"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? 'Copied' : 'Copy URL'}</span>
            </button>

            <a
              href={submission.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-xs font-semibold text-blue-300 border border-blue-500/30 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open Live Deployment
            </a>
          </div>

          {/* Description preview */}
          <div className="pt-2 border-t border-slate-800/80">
            <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
              Description & Tech Stack
            </p>
            <p className="text-xs text-slate-300 leading-relaxed max-h-24 overflow-y-auto whitespace-pre-wrap custom-scrollbar">
              {submission.description}
            </p>
          </div>
        </div>

        {/* Evaluation Decision Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Select Evaluation Decision
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {/* Approve */}
              <button
                type="button"
                onClick={() => setStatus('APPROVED')}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                  status === 'APPROVED'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/20 ring-1 ring-emerald-500'
                    : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Approve</span>
              </button>

              {/* Reject */}
              <button
                type="button"
                onClick={() => setStatus('REJECTED')}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                  status === 'REJECTED'
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-md shadow-rose-500/20 ring-1 ring-rose-500'
                    : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Reject</span>
              </button>

              {/* Reset to Pending */}
              <button
                type="button"
                onClick={() => setStatus('PENDING')}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                  status === 'PENDING'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md shadow-amber-500/20 ring-1 ring-amber-500'
                    : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Pending</span>
              </button>
            </div>
          </div>

          {/* Quick Feedback Templates (Only shown when Approved or Rejected) */}
          {status !== 'PENDING' && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  Quick Evaluation Templates
                </span>
                <span className="text-[10px] text-slate-500">Click to fill</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {(status === 'APPROVED' ? approvedTemplates : rejectedTemplates).map((tpl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setFeedback(tpl)}
                    className="text-left px-3 py-1.5 rounded-lg bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800/90 text-slate-300 text-xs transition-colors hover:border-slate-700"
                  >
                    &ldquo;{tpl}&rdquo;
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Feedback Textarea */}
          <Textarea
            label="Evaluation Notes & Constructive Feedback"
            placeholder={
              status === 'APPROVED'
                ? 'Specify commendable aspects (e.g. clean code structure, error handling, responsive UI)...'
                : status === 'REJECTED'
                ? 'Explain specifically what failed or needs rectification so the student can fix and resubmit...'
                : 'Optional notes while project remains in review queue...'
            }
            rows={3}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            helperText={`${feedback.length} / 1000 characters • Feedback is visible to the student in real-time.`}
          />

          {/* Sticky Bottom Actions Bar */}
          <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur-md pt-3 pb-1 -mx-6 px-6 border-t border-slate-800 flex items-center justify-end gap-3 z-10">
            <Button type="button" variant="ghost" size="md" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant={status === 'APPROVED' ? 'primary' : status === 'PENDING' ? 'outline' : 'destructive'}
              size="md"
              isLoading={isSubmitting}
              className={`font-semibold shadow-md ${
                status === 'APPROVED'
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20'
                  : status === 'PENDING'
                  ? 'border-amber-500/40 text-amber-300 hover:bg-amber-950/30'
                  : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-500/20'
              }`}
            >
              <Save className="w-4 h-4 mr-2" />
              {isUpdate ? 'Save Evaluation Updates' : 'Confirm Evaluation'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
