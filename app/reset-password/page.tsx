'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-client';
import toast from 'react-hot-toast';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checkingSession, setCheckingSession] = useState(true);
  const [isSessionValid, setIsSessionValid] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) setIsSessionValid(true);
      else toast.error('No valid session found. Please use the link in your email.');
    };

    checkSession().finally(() => setCheckingSession(false));
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Password updated! You can now log in.');
      router.push('/login');
    }
  };

  if (checkingSession) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        <p>Checking session...</p>
      </main>
    );
  }

  if (!isSessionValid) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        <p>Invalid or expired reset link.</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 text-white">
      <form onSubmit={handleReset} className="w-full max-w-md space-y-4">
        <h2 className="text-2xl font-semibold">Reset Password</h2>

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 border rounded text-black"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 border rounded text-black"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit" className="w-full bg-black text-white py-2 rounded">
          Update Password
        </button>
      </form>
    </main>
  );
}
