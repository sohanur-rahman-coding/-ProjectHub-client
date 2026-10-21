'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { api } from '../../lib/api';
import { toast } from 'sonner';
import { Send, Sparkles, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';

export const SubmissionForm: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    projectName: '',
    repoUrl: '',
    liveUrl: '',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [duplicateAlert, setDuplicateAlert] = useState<string | null>(null);

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
      errs.liveUrl = 'Live demo link is required';
    } else {
      try {
        new URL(formData.liveUrl.trim());
      } catch {
        errs.liveUrl = 'Please enter a valid URL (e.g. https://my-project.vercel.app)';
      }
    }

    if (!formData.description.trim()) {
      errs.description = 'Project description is required';
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
    if (duplicateAlert) {
      setDuplicateAlert(null);
    }
  };

  const handleFillDemoData = () => {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    setFormData({
      projectName: `NexTrack SaaS Dashboard #${randomSuffix}`,
      repoUrl: `https://github.com/developer/nextrack-${randomSuffix}`,
      liveUrl: `https://nextrack-demo-${randomSuffix}.vercel.app`,
      description: `A production-ready team velocity management platform featuring Kanban task boards, real-time activity streaming, and role-based permissions built with TypeScript and PostgreSQL.`,
    });
    setErrors({});
    setDuplicateAlert(null);
    toast.success('Filled with sample project details!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setDuplicateAlert(null);

    try {
      const res = await api.submissions.create(formData);
      toast.success('Project submitted successfully for review!');
      router.push('/student/my-projects');
    } catch (err: any) {
      if (err.status === 409) {
        // Duplicate Submission caught by server validation
        const msg = err.data?.message || err.message || 'Duplicate submission detected.';
        setDuplicateAlert(msg);
        toast.error(msg, { duration: 5000 });
      } else if (err.status === 429) {
        // Rate limit hit
        const msg = err.message || 'Rate limit exceeded. Please wait before submitting again.';
        toast.error(msg, { duration: 6000 });
      } else {
        toast.error(err.message || 'Failed to submit project');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto border-slate-800 bg-slate-900/70 shadow-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Send className="w-5 h-5 text-blue-400" />
              Submit Your Project
            </CardTitle>
            <CardDescription className="mt-1">
              Provide your repository and live demo links for mentor evaluation and feedback.
            </CardDescription>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleFillDemoData}
            className="text-xs border-blue-500/30 text-blue-300 hover:bg-blue-500/10"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1 text-blue-400" />
            Auto-fill Sample
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {duplicateAlert && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-semibold text-rose-200">Duplicate Submission Detected</p>
              <p className="mt-1 text-rose-300/90">{duplicateAlert}</p>
              <button
                type="button"
                onClick={() => router.push('/student/my-projects')}
                className="mt-2 inline-flex items-center gap-1 font-semibold text-rose-200 hover:underline"
              >
                View your existing submissions <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Project Name"
            name="projectName"
            placeholder="e.g. NextPulse Analytics Platform"
            value={formData.projectName}
            onChange={handleChange}
            error={errors.projectName}
            helperText="Clear and descriptive name of your application"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Repository URL"
              name="repoUrl"
              placeholder="https://github.com/username/project"
              value={formData.repoUrl}
              onChange={handleChange}
              error={errors.repoUrl}
              helperText="GitHub, GitLab, or Bitbucket link"
            />

            <Input
              label="Live Demo Link"
              name="liveUrl"
              placeholder="https://my-demo.vercel.app"
              value={formData.liveUrl}
              onChange={handleChange}
              error={errors.liveUrl}
              helperText="Public deployed URL (Vercel, Netlify, Render)"
            />
          </div>

          <Textarea
            label="Project Description & Features"
            name="description"
            rows={4}
            placeholder="Outline your project architecture, core features, tech stack, and any credentials needed to test..."
            value={formData.description}
            onChange={handleChange}
            error={errors.description}
            charCount={formData.description.length}
            maxChars={2000}
            helperText="Minimum 20 characters. Detail key functionality for mentors."
          />

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              className="w-full font-semibold shadow-blue-500/25"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Project for Review
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
