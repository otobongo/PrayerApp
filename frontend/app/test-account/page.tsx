'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

export default function TestAccountPage() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  // Fixed test credentials - easy to remember
  const TEST_ACCOUNTS = [
    { email: 'test@example.com', password: 'Test123456!', name: 'Test User 1' },
    { email: 'demo@example.com', password: 'Demo123456!', name: 'Demo User' },
    { email: 'user@example.com', password: 'User123456!', name: 'Regular User' },
  ];

  const createTestAccount = async (account: typeof TEST_ACCOUNTS[0]) => {
    setLoading(true);
    setStatus(`Creating account: ${account.email}...`);

    try {
      // First, try to sign in (in case account exists)
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: account.email,
        password: account.password,
      });

      if (!signInError) {
        setStatus(`✅ Account already exists! You can login with:

Email: ${account.email}
Password: ${account.password}

Try logging in now at /auth/login`);
        return;
      }

      // If sign in failed, try to create the account
      const { data, error } = await supabase.auth.signUp({
        email: account.email,
        password: account.password,
        options: {
          data: {
            name: account.name,
          },
        },
      });

      if (error) {
        if (error.message.includes('already registered')) {
          setStatus(`⚠️ Account already exists but password might be different.

Try these credentials at /auth/login:
Email: ${account.email}
Password: ${account.password}

If this doesn't work, the account exists with a different password.`);
        } else {
          setStatus(`❌ Error: ${error.message}`);
        }
      } else {
        setStatus(`✅ Success! Account created:

Email: ${account.email}
Password: ${account.password}

${data.session ? 'You can login now!' : 'Note: You may need to confirm your email if email confirmation is enabled in Supabase.'}

Go to: http://localhost:3003/auth/login`);
      }
    } catch (err: any) {
      setStatus(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async (account: typeof TEST_ACCOUNTS[0]) => {
    setLoading(true);
    setStatus(`Testing login for ${account.email}...`);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: account.email,
        password: account.password,
      });

      if (error) {
        setStatus(`❌ Login failed: ${error.message}`);
      } else {
        setStatus(`✅ Login successful! Redirecting to dashboard...`);
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);
      }
    } catch (err: any) {
      setStatus(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">🔑 Quick Test Account Creator</h1>
        <p className="text-gray-600 mb-8">Create or login with test accounts using easy-to-remember credentials</p>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Available Test Accounts</h2>
          <div className="space-y-4">
            {TEST_ACCOUNTS.map((account, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-mono text-sm mb-1">
                      <span className="font-semibold">Email:</span> {account.email}
                    </p>
                    <p className="font-mono text-sm mb-1">
                      <span className="font-semibold">Password:</span> {account.password}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Name:</span> {account.name}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => createTestAccount(account)}
                      disabled={loading}
                      size="sm"
                    >
                      Create
                    </Button>
                    <Button
                      onClick={() => testLogin(account)}
                      disabled={loading}
                      variant="outline"
                      size="sm"
                    >
                      Test Login
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {status && (
          <div className={`rounded-lg p-4 mb-6 whitespace-pre-wrap font-mono text-sm
            ${status.includes('✅') ? 'bg-green-100 text-green-800 border border-green-300' : ''}
            ${status.includes('❌') ? 'bg-red-100 text-red-800 border border-red-300' : ''}
            ${status.includes('⚠️') ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' : ''}
            ${!status.includes('✅') && !status.includes('❌') && !status.includes('⚠️') ? 'bg-blue-100 text-blue-800 border border-blue-300' : ''}
          `}>
            {status}
          </div>
        )}

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-900 mb-2">📝 Instructions:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-yellow-800">
            <li>Click <strong>"Create"</strong> next to any account to create it</li>
            <li>Copy the email and password shown</li>
            <li>Click <strong>"Test Login"</strong> to verify it works</li>
            <li>Or go to <a href="/auth/login" className="underline">Login Page</a> and use the credentials</li>
            <li>If account already exists, just use <strong>"Test Login"</strong></li>
          </ol>
        </div>

        <div className="mt-6 flex gap-4">
          <a href="/auth/login" className="text-blue-600 hover:underline">
            Go to Login Page →
          </a>
          <a href="/auth-test" className="text-blue-600 hover:underline">
            Go to Auth Test Page →
          </a>
          <a href="/dashboard" className="text-blue-600 hover:underline">
            Go to Dashboard →
          </a>
        </div>
      </div>
    </div>
  );
}