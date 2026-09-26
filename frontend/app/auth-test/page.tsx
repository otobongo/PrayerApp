'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

export default function AuthTestPage() {
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuth();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event);
      console.log('Session:', session);
      setSession(session);
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkAuth = async () => {
    try {
      // Get current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.error('Session error:', sessionError);
        setError(`Session error: ${sessionError.message}`);
      }

      console.log('Current session:', session);
      setSession(session);
      setUser(session?.user || null);

      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError) {
        console.error('User error:', userError);
      }

      console.log('Current user:', user);
    } catch (err: any) {
      console.error('Auth check error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testSignUp = async () => {
    const testEmail = `test${Date.now()}@example.com`;
    const testPassword = 'TestPassword123!';

    console.log('Creating test user:', testEmail);

    const { data, error } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
    });

    if (error) {
      console.error('Signup error:', error);
      alert(`Signup error: ${error.message}`);
    } else {
      console.log('Signup successful:', data);
      alert(`Test user created: ${testEmail}\nPassword: ${testPassword}\n\nCheck console for details.`);
    }
  };

  const testSignIn = async () => {
    const email = prompt('Enter email:');
    const password = prompt('Enter password:');

    if (!email || !password) return;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error);
      alert(`Login error: ${error.message}`);
    } else {
      console.log('Login successful:', data);
      alert('Login successful! Check console for details.');
      await checkAuth();
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Signout error:', error);
      alert(`Signout error: ${error.message}`);
    } else {
      alert('Signed out successfully');
      await checkAuth();
    }
  };

  const checkSupabaseConnection = async () => {
    try {
      // Try to query a public table or use a simple RPC call
      const { data, error } = await supabase
        .from('profiles')
        .select('count')
        .limit(1);

      if (error) {
        console.error('Database connection error:', error);
        alert(`Database connection error: ${error.message}\n\nThis might mean:\n1. Tables are not set up in Supabase\n2. RLS policies are blocking access\n3. Supabase project is not configured`);
      } else {
        console.log('Database connection successful:', data);
        alert('Database connection successful!');
      }
    } catch (err: any) {
      console.error('Connection test error:', err);
      alert(`Connection test error: ${err.message}`);
    }
  };

  if (loading) {
    return <div className="p-8">Loading auth status...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Supabase Auth Test Page</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Auth Status</h2>
          <div className="space-y-2">
            <p><strong>Logged In:</strong> {user ? 'Yes' : 'No'}</p>
            <p><strong>User ID:</strong> {user?.id || 'None'}</p>
            <p><strong>Email:</strong> {user?.email || 'None'}</p>
            <p><strong>Session:</strong> {session ? 'Active' : 'None'}</p>
            <p><strong>Session Expires:</strong> {session?.expires_at ? new Date(session.expires_at * 1000).toLocaleString() : 'N/A'}</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Environment Info</h2>
          <div className="space-y-2 font-mono text-sm">
            <p><strong>SUPABASE_URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
            <p><strong>Has ANON_KEY:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Yes' : 'No'}</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Test Actions</h2>
          <div className="space-x-4">
            <Button onClick={checkSupabaseConnection}>Test DB Connection</Button>
            <Button onClick={testSignUp}>Create Test User</Button>
            <Button onClick={testSignIn}>Test Sign In</Button>
            <Button onClick={checkAuth}>Refresh Auth Status</Button>
            {user && <Button onClick={signOut} variant="destructive">Sign Out</Button>}
          </div>
        </div>

        <div className="mt-6 bg-yellow-100 border border-yellow-400 p-4 rounded">
          <h3 className="font-semibold mb-2">Debugging Tips:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Open browser console (F12) to see detailed logs</li>
            <li>Check Network tab for Supabase API calls</li>
            <li>If login redirects back to login page, check middleware.ts</li>
            <li>Ensure email confirmation is disabled in Supabase for testing</li>
            <li>Check Supabase Dashboard → Authentication → Users for created accounts</li>
          </ul>
        </div>
      </div>
    </div>
  );
}