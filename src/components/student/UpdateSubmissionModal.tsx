'use client';

import React, { useState, useEffect } from 'react';
import { ProjectSubmission } from '../../types';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { api } from '../../lib/api';
import { toast } from 'sonner';
import {
  Edit3,
  GitBranch,
  ExternalLink,
  AlertCircle,
  Save,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';

interface UpdateSubmissionModalProps {
  submission: ProjectSubmission | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updated: ProjectSubmission) => void;
}

export const UpdateSubmissionModal: React.FC<UpdateSubmissionModalProps> = ({
  submission,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    projectName: '',
    repoUrl: '',
    liveUrl: '',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [duplicateError, setDuplicateError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (submission) {
      setFormData({
        projectName: submission.projectName || '',
        repoUrl: submission.repoUrl || '',
        liveUrl: submission.liveUrl || '',
        description: submission.description || '',
      });
      setErrors({});
      setDuplicateError(null);
    }
  }, [submission]);

  if (!submission) return null;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.projectName.trim()) {
      errs.projectName = 'Project name is required';
    } else if (formData.projectName.trim().length < 3) {
      errs.projectName = 'Project name must be at least 3 characters';
    }

    if (!formData.repoUrl.trim()) {
      errs.repoUrl = 'Repository URL is required';
    } else {
      try {
        const url = new URL(formData.repoUrl.trim());
        if (!['github.com', 'gitlab.com', 'bitbucket.org'].some((host) => url.hostname.includes(host))) {
          errs.repoUrl = 'Must be a GitHub, GitLab, or Bitbucket repository URL';
        }
      } catch {
        errs.repoUrl = 'Please enter a valid URL (e.g. https://github.com/user/repo)';
      }
    }

    if (!formData.liveUrl.trim()) {
      errs.liveUrl = 'Live demo URL is required';
    } else {
      try {
        new URL(formData.liveUrl.trim());
      } catch {
        errs.liveUrl = 'Please enter a valid URL (e.g. https://my-app.vercel.app)';
      }
    }

    if (!formData.description.trim()) {
      errs.description = 'Description is required';
    } else if (formData.description.trim().length < 20) {
      errs.description = 'Description should be at least 20 characters explaining features & stack';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (duplicateError) {
      setDuplicateError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setDuplicateError(null);

    try {
      const res = await api.submissions.update(submission.id, formData);
      if (res.data?.submission) {
        toast.success(
          submission.status === 'REJECTED'
            ? 'Project updated & resubmitted for mentor evaluation!'
            : 'Project details updated successfully!'
        );
        onSuccess(res.data.submission);
        onClose();
      }
    } catch (err: any) {
      if (err.status === 409) {
        const msg = err.data?.message || err.message || 'Duplicate submission detected.';
        setDuplicateError(msg);
        toast.error(msg);
      } else {
        toast.error(err.message || 'Failed to update project submission');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Update Project Deliverables"
      description="Edit your project information, update repository or live links, and submit fixes."
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Contextual Status Banner */}
        {submission.status === 'REJECTED' ? (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-rose-200">Revising Rejected Project</p>
              <p className="mt-0.5 text-rose-300/80 leading-relaxed">
                Saving updates will automatically reset your status to <strong>PENDING</strong> so mentors can evaluate your fixed code.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>You can modify project URLs or improve description at any time.</span>
          </div>
        )}

        {duplicateError && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{duplicateError}</span>
          </div>
        )}

        {/* Project Name */}
        <Input
          label="Project Title"
          name="projectName"
          placeholder="e.g. DevPulse Analytics SaaS"
          value={formData.projectName}
          onChange={handleChange}
          error={errors.projectName}
          required
        />

        {/* Git Repo URL */}
        <Input
          label="Git Repository URL"
          name="repoUrl"
          placeholder="https://github.com/username/project"
          value={formData.repoUrl}
          onChange={handleChange}
          error={errors.repoUrl}
          helperText="Supported hosts: GitHub, GitLab, Bitbucket"
          required
        />

        {/* Live URL */}
        <Input
          label="Live Deployment Link"
          name="liveUrl"
          placeholder="https://your-project.vercel.app"
          value={formData.liveUrl}
          onChange={handleChange}
          error={errors.liveUrl}
          helperText="Must be a live, publicly accessible URL"
          required
        />

        {/* Description */}
        <Textarea
          label="Project Description & Technical Stack"
          name="description"
          rows={4}
          placeholder="Describe features, libraries, state management, and testing details..."
          value={formData.description}
          onChange={handleChange}
          error={errors.description}
          helperText={`Minimum 20 characters (${formData.description.length} entered)`}
          required
        />

        {/* Actions Footer */}
        <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur-md pt-3 pb-1 -mx-6 px-6 border-t border-slate-800 flex items-center justify-end gap-2.5 z-10">
          <Button type="button" variant="ghost" size="md" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            className="font-semibold shadow-md shadow-blue-500/20"
          >
            <Save className="w-4 h-4 mr-2" />
            Save & Update Project
          </Button>
        </div>
      </form>
    </Modal>
  );
};
