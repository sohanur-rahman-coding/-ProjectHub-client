import React from 'react';
import { AggregatedStats } from '../../types';
import { Card } from '../ui/Card';
import { FileCode, Clock, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';

interface StatsCardsProps {
  stats: AggregatedStats | null;
  loading: boolean;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats, loading }) => {
  const cards = [
    {
      title: 'Total Submissions',
      value: stats?.totalSubmissions ?? 0,
      icon: FileCode,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      description: 'All submitted projects',
    },
    {
      title: 'Pending Review',
      value: stats?.totalPending ?? 0,
      icon: Clock,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      description: 'Awaiting mentor evaluation',
    },
    {
      title: 'Approved Projects',
      value: stats?.totalApproved ?? 0,
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      description: 'Passed review criteria',
    },
    {
      title: 'Rejected Projects',
      value: stats?.totalRejected ?? 0,
      icon: XCircle,
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/20',
      description: 'Requires revision or resubmission',
    },
    {
      title: 'Approval Rate',
      value: `${stats?.approvalRate ?? 0}%`,
      icon: TrendingUp,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      description: 'Ratio of approved / reviewed',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
      {cards.map((item, idx) => {
        const Icon = item.icon;
        return (
          <Card
            key={idx}
            className={`border ${item.borderColor} bg-slate-900/60 p-4 transition-all hover:bg-slate-900/80 shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {item.title}
              </span>
              <div className={`p-2 rounded-lg ${item.bgColor} ${item.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3">
              {loading ? (
                <div className="h-8 w-16 bg-slate-800 rounded animate-pulse" />
              ) : (
                <p className={`text-2xl font-extrabold tracking-tight ${item.color}`}>{item.value}</p>
              )}
              <p className="text-[10px] text-slate-400 mt-1 truncate">{item.description}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
