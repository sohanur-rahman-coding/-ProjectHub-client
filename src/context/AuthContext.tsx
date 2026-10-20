'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '../types';
import { api } from '../lib/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: { name: string; email: string; password: string; role?: 'STUDENT' | 'MENTOR' }) => Promise<void>;
  logout: () => void;
  isMentor: boolean;
  isStudent: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('auth_token');
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      setToken(storedToken);

      try {
        const res = await api.auth.getMe();
        if (res.data?.user) {
          setUser(res.data.user);
        } else {
          localStorage.removeItem('auth_token');
          setToken(null);
        }
      } catch (err) {
        console.error('Failed to verify token:', err);
        localStorage.removeItem('auth_token');
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    const res = await api.auth.login(credentials);
    if (res.data) {
      localStorage.setItem('auth_token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);

      if (res.data.user.role === 'MENTOR' || res.data.user.role === 'ADMIN') {
        router.push('/mentor/dashboard');
      } else {
        router.push('/student/submit');
      }
    }
  };

  const register = async (userData: { name: string; email: string; password: string; role?: 'STUDENT' | 'MENTOR' }) => {
    const res = await api.auth.register(userData);
    if (res.data) {
      localStorage.setItem('auth_token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);

      if (res.data.user.role === 'MENTOR' || res.data.user.role === 'ADMIN') {
        router.push('/mentor/dashboard');
      } else {
        router.push('/student/submit');
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    setToken(null);
    router.push('/login');
  };

  const isMentor = user?.role === 'MENTOR' || user?.role === 'ADMIN';
  const isStudent = user?.role === 'STUDENT';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        isMentor,
        isStudent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
