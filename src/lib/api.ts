import {
  ApiResponse,
  AggregatedStats,
  PaginationMeta,
  ProjectSubmission,
  SubmissionStatus,
  User,
} from '../types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg =
      data.message || (data.errors && data.errors[0]?.message) || `Request failed with status ${response.status}`;
    const error = new Error(errorMsg) as Error & { status?: number; data?: any };
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  auth: {
    login: async (credentials: { email: string; password: string }) => {
      return request<ApiResponse<{ user: User; token: string }>>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    },

    register: async (userData: { name: string; email: string; password: string; role?: 'STUDENT' | 'MENTOR' }) => {
      return request<ApiResponse<{ user: User; token: string }>>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    },

    getMe: async () => {
      return request<ApiResponse<{ user: User }>>('/auth/me');
    },
  },

  submissions: {
    create: async (submission: {
      projectName: string;
      repoUrl: string;
      liveUrl: string;
      description: string;
    }) => {
      return request<ApiResponse<{ submission: ProjectSubmission }>>('/submissions', {
        method: 'POST',
        body: JSON.stringify(submission),
      });
    },

    getMySubmissions: async () => {
      return request<ApiResponse<{ submissions: ProjectSubmission[] }>>('/submissions/my');
    },
  },

  reviews: {
    getStats: async () => {
      return request<ApiResponse<{ stats: AggregatedStats }>>('/reviews/stats');
    },

    getSubmissions: async (params: {
      page?: number;
      limit?: number;
      status?: 'ALL' | SubmissionStatus;
      search?: string;
      sortBy?: string;
      sortOrder?: 'asc' | 'desc';
    }) => {
      const searchParams = new URLSearchParams();
      if (params.page) searchParams.set('page', params.page.toString());
      if (params.limit) searchParams.set('limit', params.limit.toString());
      if (params.status && params.status !== 'ALL') searchParams.set('status', params.status);
      if (params.search) searchParams.set('search', params.search);
      if (params.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params.sortOrder) searchParams.set('sortOrder', params.sortOrder);

      const qs = searchParams.toString();
      return request<ApiResponse<{ submissions: ProjectSubmission[]; pagination: PaginationMeta }>>(
        `/reviews/submissions${qs ? `?${qs}` : ''}`,
      );
    },

    updateReview: async (
      id: string,
      review: {
        status: 'APPROVED' | 'REJECTED';
        feedback?: string;
      },
    ) => {
      return request<ApiResponse<{ submission: ProjectSubmission }>>(`/reviews/submissions/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(review),
      });
    },
  },
};
