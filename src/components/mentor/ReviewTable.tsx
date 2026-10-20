'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ProjectSubmission, PaginationMeta, SubmissionStatus } from '../../types';
import { api } from '../../lib/api';
import { StatusBadge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { ReviewModal } from './ReviewModal';
import { formatDate } from '../../lib/utils';
import {
  Search,
  ExternalLink,
  GitBranch,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Layers,
  Edit3,
  RefreshCw,
  Inbox,
  SearchX,
  RotateCcw,
} from 'lucide-react';

interface ReviewTableProps {
  onDataChange?: () => void;
}

export const ReviewTable: React.FC<ReviewTableProps> = ({ onDataChange }) => {
  const [submissions, setSubmissions] = useState<ProjectSubmission[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>({
    total: 0,
    page: 1,
    limit: 8,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  });

  const [statusFilter, setStatusFilter] = useState<'ALL' | SubmissionStatus>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeSubmission, setActiveSubmission] = useState<ProjectSubmission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchSubmissions = useCallback(
    async (pageToLoad = 1) => {
      setLoading(true);
      try {
        const res = await api.reviews.getSubmissions({
          page: pageToLoad,
          limit: pagination.limit,
          status: statusFilter,
          search: searchTerm.trim() || undefined,
          sortBy: 'createdAt',
          sortOrder: 'desc',
        });

        if (res.data) {
          setSubmissions(res.data.submissions);
          setPagination(res.data.pagination);
        }
      } catch (err) {
        console.error('Failed to fetch submissions for review:', err);
      } finally {
        setLoading(false);
      }
    },
    [pagination.limit, statusFilter, searchTerm],
  );

  // Re-fetch on filter/search change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSubmissions(1);
    }, 250);

    return () => clearTimeout(timer);
  }, [statusFilter, searchTerm, pagination.limit, fetchSubmissions]);

  const handleOpenReview = (sub: ProjectSubmission) => {
    setActiveSubmission(sub);
    setIsModalOpen(true);
  };

  const handleReviewSuccess = (updated: ProjectSubmission) => {
    fetchSubmissions(pagination.page);
    if (onDataChange) onDataChange();
  };

  const filterTabs: Array<{ id: 'ALL' | SubmissionStatus; label: string; icon: any }> = [
    { id: 'ALL', label: 'All Projects', icon: Layers },
    { id: 'PENDING', label: 'Pending', icon: Clock },
    { id: 'APPROVED', label: 'Approved', icon: CheckCircle2 },
    { id: 'REJECTED', label: 'Rejected', icon: XCircle },
  ];

  return (
    <>
      <Card className="border-slate-800 bg-slate-900/60 p-0 overflow-hidden shadow-2xl">
      {/* Table Header Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-950/40 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Status Filter Tabs (Server-side) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const active = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  active
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar & Refresh */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search project, student, repo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-900/90 pl-9 pr-3.5 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchSubmissions(pagination.page)}
            className="shrink-0 h-8"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
            <tr>
              <th className="py-3.5 px-4 sm:px-6">Project Name</th>
              <th className="py-3.5 px-4">Student</th>
              <th className="py-3.5 px-4">Repository & Demo</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Submitted</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {loading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td className="py-4 px-4 sm:px-6">
                    <div className="h-4 w-40 bg-slate-800 rounded mb-1.5" />
                    <div className="h-3 w-60 bg-slate-800/60 rounded" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 w-24 bg-slate-800 rounded mb-1" />
                    <div className="h-3 w-32 bg-slate-800/60 rounded" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-6 w-28 bg-slate-800 rounded" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-6 w-20 bg-slate-800 rounded-full" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 w-24 bg-slate-800 rounded" />
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-right">
                    <div className="h-8 w-20 bg-slate-800 rounded ml-auto" />
                  </td>
                </tr>
              ))
            ) : submissions.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-16 text-center text-slate-400">
                  <div className="max-w-sm mx-auto p-6 rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 text-center space-y-3">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800/80 text-slate-400">
                      {searchTerm || statusFilter !== 'ALL' ? (
                        <SearchX className="w-7 h-7 text-amber-400" />
                      ) : (
                        <Inbox className="w-7 h-7 text-blue-400" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-white">
                        {searchTerm || statusFilter !== 'ALL'
                          ? 'No matching project submissions'
                          : 'Review queue is currently empty'}
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {searchTerm || statusFilter !== 'ALL'
                          ? `No records found matching status "${statusFilter}" or keyword "${searchTerm}".`
                          : 'New submissions from students will appear here in real-time.'}
                      </p>
                    </div>

                    {(searchTerm || statusFilter !== 'ALL') && (
                      <div className="pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSearchTerm('');
                            setStatusFilter('ALL');
                          }}
                          className="text-xs border-slate-700 hover:border-slate-600 text-slate-200"
                        >
                          <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                          Clear Filters & Search
                        </Button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-850/40 transition-colors">
                  {/* Project Details */}
                  <td className="py-3.5 px-4 sm:px-6 max-w-xs">
                    <p className="font-bold text-white truncate">{sub.projectName}</p>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{sub.description}</p>
                  </td>

                  {/* Student */}
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-200">{sub.student?.name || 'Student'}</p>
                    <p className="text-[11px] text-slate-400">{sub.student?.email}</p>
                  </td>

                  {/* Links */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <a
                        href={sub.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 transition-colors"
                      >
                        <GitBranch className="w-3 h-3" />
                        Code
                        <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                      </a>
                      <a
                        href={sub.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-500/10 hover:bg-blue-500/20 text-[11px] text-blue-300 border border-blue-500/20 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Live
                      </a>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <StatusBadge status={sub.status} />
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-slate-400">
                    {formatDate(sub.createdAt)}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                    <Button
                      variant={sub.status === 'PENDING' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handleOpenReview(sub)}
                      className="text-xs font-semibold"
                    >
                      <Edit3 className="w-3.5 h-3.5 mr-1" />
                      {sub.status === 'PENDING' ? 'Review' : 'Update'}
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="p-4 sm:px-6 border-t border-slate-800 bg-slate-950/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div>
          Showing page <span className="font-bold text-slate-200">{pagination.page}</span> of{' '}
          <span className="font-bold text-slate-200">{pagination.totalPages}</span> ({pagination.total}{' '}
          total submissions)
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchSubmissions(pagination.page - 1)}
            disabled={!pagination.hasPrev || loading}
            className="text-xs"
          >
            <ChevronLeft className="w-3.5 h-3.5 mr-1" />
            Previous
          </Button>

          {/* Quick page numbers */}
          <div className="flex items-center gap-1">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
              .filter((p) => Math.abs(p - pagination.page) <= 2 || p === 1 || p === pagination.totalPages)
              .map((p, idx, arr) => (
                <React.Fragment key={p}>
                  {idx > 0 && arr[idx - 1] !== p - 1 && <span className="px-1 text-slate-600">...</span>}
                  <button
                    onClick={() => fetchSubmissions(p)}
                    className={`h-7 w-7 rounded-md font-semibold text-xs transition-colors ${
                      pagination.page === p
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {p}
                  </button>
                </React.Fragment>
              ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchSubmissions(pagination.page + 1)}
            disabled={!pagination.hasNext || loading}
            className="text-xs"
          >
            Next
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </div>
    </Card>

    {/* Review & Evaluation Modal rendered outside Card */}
    <ReviewModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      submission={activeSubmission}
      onSuccess={handleReviewSuccess}
    />
  </>
  );
};
