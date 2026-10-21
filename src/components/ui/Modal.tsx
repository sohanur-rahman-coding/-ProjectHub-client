'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  allowFullScreen?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'lg',
  allowFullScreen = true,
}) => {
  const [mounted, setMounted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset fullscreen when closed/opened
  useEffect(() => {
    if (!isOpen) {
      setIsFullscreen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isFullscreen, onClose]);

  if (!isOpen || !mounted) return null;

  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  const modalContent = (
    <div
      className={cn(
        'fixed inset-0 z-[9999] flex items-center justify-center transition-all',
        isFullscreen ? 'p-0 overflow-hidden' : 'p-3 sm:p-6 overflow-y-auto'
      )}
    >
      {/* Full-screen Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Floating / Full-screen Dialog Window */}
      <div
        className={cn(
          'relative w-full flex flex-col border border-slate-700/80 bg-slate-900/95 shadow-2xl backdrop-blur-2xl z-10 transition-all overflow-hidden animate-in fade-in zoom-in-95 duration-200',
          isFullscreen
            ? 'h-full max-h-screen rounded-none border-0'
            : cn('max-h-[92vh] my-auto rounded-2xl', maxWidths[maxWidth])
        )}
        role="dialog"
        aria-modal="true"
      >
        {/* Pinned Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 shrink-0">
          <div className="pr-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight">{title}</h2>
            {description && <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{description}</p>}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {allowFullScreen && (
              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition-colors"
                title={isFullscreen ? 'Exit Full Screen' : 'Open Full Screen'}
                aria-label={isFullscreen ? 'Exit Full Screen' : 'Open Full Screen'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition-colors"
              title="Close dialog"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto px-6 py-4 flex-1 space-y-4 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
