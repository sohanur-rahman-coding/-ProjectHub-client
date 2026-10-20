import React from 'react';
import { cn } from '../../lib/utils';
import { SubmissionStatus, Role } from '../../types';
import { CheckCircle2, Clock, XCircle, ShieldCheck, GraduationCap } from 'lucide-react';

interface StatusBadgeProps {
  status: SubmissionStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  switch (status) {
    case 'APPROVED':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm shadow-emerald-500/10',
            className,
          )}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          Approved
        </span>
      );
    case 'REJECTED':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30 shadow-sm shadow-rose-500/10',
            className,
          )}
        >
          <XCircle className="w-3.5 h-3.5 text-rose-400" />
          Rejected
        </span>
      );
    case 'PENDING':
    default:
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 shadow-sm shadow-amber-500/10',
            className,
          )}
        >
          <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          Pending Review
        </span>
      );
  }
};

interface RoleBadgeProps {
  role: Role;
  className?: string;
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ role, className }) => {
  if (role === 'ADMIN') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30 shadow-sm shadow-rose-500/10',
          className,
        )}
      >
        <ShieldCheck className="w-3 h-3 text-rose-400" />
        Admin
      </span>
    );
  }

  if (role === 'MENTOR') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-purple-500/15 text-purple-300 border border-purple-500/30',
          className,
        )}
      >
        <ShieldCheck className="w-3 h-3 text-purple-400" />
        Mentor
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-500/15 text-blue-300 border border-blue-500/30',
        className,
      )}
    >
      <GraduationCap className="w-3 h-3 text-blue-400" />
      Student
    </span>
  );
};
