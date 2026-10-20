'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import toast from 'react-hot-toast';
import { UserPlus, GraduationCap, ShieldCheck, AlertCircle } from 'lucide-react';
import { GoogleButton } from '../../components/ui/GoogleButton';

export default function SignupPage() {
  const { register } = useAuth();
  const [role, setRole] = useState<'STUDENT' | 'MENTOR'>('STUDENT');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      await register({ name, email, password, role });
      toast.success(
        role === 'MENTOR'
          ? 'Teacher / Mentor account created! Redirecting to review dashboard...'
          : 'Student account created! Redirecting to submission portal...'
      );
    } catch (err: any) {
      const msg = err.message || 'Registration failed. Email might already be taken.';
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    toast(
      'Google OAuth 2.0 integration is ready to link with Google Cloud Console credentials.',
      {
        icon: 'ℹ️',
        duration: 4000,
      }
    );
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <Card className="border-slate-800 bg-slate-900/80 shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-400 mb-2">
            {role === 'STUDENT' ? (
              <GraduationCap className="w-6 h-6 text-blue-400" />
            ) : (
              <ShieldCheck className="w-6 h-6 text-purple-400" />
            )}
          </div>
          <CardTitle className="text-2xl font-extrabold text-white">
            {role === 'STUDENT' ? 'Student Registration' : 'Teacher / Mentor Registration'}
          </CardTitle>
          <CardDescription>
            {role === 'STUDENT'
              ? 'Submit your projects, track live statuses, and receive mentor feedback.'
              : 'Evaluate submissions, approve/reject assignments, and post reviews.'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Official Google OAuth Registration */}
          <div className="mb-4">
            <GoogleButton role={role} label={`Sign up with Google as ${role === 'STUDENT' ? 'Student' : 'Mentor'}`} />
          </div>

          <div className="relative flex py-2 items-center mb-4">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Or register with email
            </span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          {/* Account Role Selector */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Your Role
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-950/60 border border-slate-800">
              <button
                type="button"
                onClick={() => setRole('STUDENT')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                  role === 'STUDENT'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                Student
              </button>

              <button
                type="button"
                onClick={() => setRole('MENTOR')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                  role === 'MENTOR'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                Teacher / Mentor
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder={role === 'STUDENT' ? 'e.g. Alex Johnson' : 'e.g. Professor Smith'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder={role === 'STUDENT' ? 'alex@student.edu' : 'smith@academy.edu'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showPasswordToggle={true}
              required
              helperText="Must be minimum 6 characters long"
            />

            <Button
              type="submit"
              variant={role === 'STUDENT' ? 'primary' : 'secondary'}
              size="lg"
              isLoading={isLoading}
              className={`w-full mt-2 font-semibold ${
                role === 'STUDENT' ? 'shadow-blue-500/20' : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/20'
              }`}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Sign Up as {role === 'STUDENT' ? 'Student' : 'Teacher / Mentor'}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center text-xs text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-400 font-semibold hover:underline ml-1">
            Log in instead
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
