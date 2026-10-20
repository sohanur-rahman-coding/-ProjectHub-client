import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950/40 py-6 text-center text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>Project Submission & Review Dashboard • TypeScript, Next.js, Express & PostgreSQL</p>
        <p className="text-slate-400">Assignment Job Task • Built with clean & maintainable code</p>
      </div>
    </footer>
  );
};
