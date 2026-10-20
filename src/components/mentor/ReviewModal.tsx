'use client';

import React, { useState } from 'react';
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
  User,
  Clock,
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
  const [status, setStatus] = useState<'APPROVED' | 'REJECTED'>('APPROVED');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync state when submission opens
  React.useEffect(() => {
    if (submission) {
      setStatus(submission.status === 'REJECTED' ? 'REJECTED' : 'APPROVED');
      setFeedback(submission.reviewFeedback || '');
    }
  }, [submission]);

  if (!submission) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await api.reviews.updateReview(submission.id, {
        status,
        feedback: feedback.trim(),
      });

      if (res.data?.submission) {
        toast.success(`Project marked as ${status}`);
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
      title="Review Project Submission"
      description="Inspect student code repository, test live preview, and provide evaluation feedback."
      maxWidth="2xl"
    >
      <div className="space-y-5">
        {/* Project Meta Info */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-base font-bold text-white">{submission.projectName}</h3>
            <StatusBadge status={submission.status} />
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-400" />
              <span>
                {submission.student?.name || 'Student'} ({submission.student?.email})
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Submitted {formatDate(submission.createdAt)}</span>
            </div>
          </div>

          {/* Links preview buttons */}
          <div className="flex items-center gap-2.5 pt-2">
            <a
              href={submission.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors"
            >
              <GitBranch className="w-3.5 h-3.5" />
              Inspect Git Repo
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <a
              href={submission.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-xs font-medium text-blue-300 border border-blue-500/30 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open Live Deployment
            </a>
          </div>

          {/* Description */}
          <div className="pt-2 border-t border-slate-800/80">
            <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
              Project Description
            </p>
            <p className="text-xs text-slate-300 leading-relaxed max-h-32 overflow-y-auto whitespace-pre-wrap">
              {submission.description}
            </p>
          </div>
        </div>

        {/* Evaluation Decision Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Decision Action
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStatus('APPROVED')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-semibold transition-all ${
                  status === 'APPROVED'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/20 ring-1 ring-emerald-500'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Approve Project
              </button>

              <button
                type="button"
                onClick={() => setStatus('REJECTED')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-semibold transition-all ${
                  status === 'REJECTED'
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-md shadow-rose-500/20 ring-1 ring-rose-500'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <XCircle className="w-4 h-4 text-rose-400" />
                Reject Submission
              </button>
            </div>
          </div>

          <Textarea
            label="Evaluation Feedback / Notes"
            placeholder={
              status === 'APPROVED'
                ? 'Specify what was done well (e.g., clean code structure, error handling, responsive UI)...'
                : 'Explain what failed or needs improvement so the student can rectify and resubmit...'
            }
            rows={3}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            helperText="Feedback is displayed to the student on their project tracking portal."
          />

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
            <Button type="button" variant="ghost" size="md" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant={status === 'APPROVED' ? 'success' : 'destructive'}
              size="md"
              isLoading={isSubmitting}
            >
              Confirm {status === 'APPROVED' ? 'Approval' : 'Rejection'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
