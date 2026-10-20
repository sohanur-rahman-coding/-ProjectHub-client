export type Role = 'STUDENT' | 'MENTOR' | 'ADMIN';

export type SubmissionStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
}

export interface StudentSummary {
  id: string;
  name: string;
  email: string;
}

export interface MentorSummary {
  id: string;
  name: string;
  email: string;
}

export interface ProjectSubmission {
  id: string;
  projectName: string;
  repoUrl: string;
  liveUrl: string;
  description: string;
  status: SubmissionStatus;
  reviewFeedback: string | null;
  reviewedAt: string | null;
  studentId: string;
  student?: StudentSummary;
  reviewedById: string | null;
  reviewedBy?: MentorSummary | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface AggregatedStats {
  totalSubmissions: number;
  totalPending: number;
  totalApproved: number;
  totalRejected: number;
  approvalRate: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}
