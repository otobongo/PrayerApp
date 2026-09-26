'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function QuickSetupPage() {
  const [status, setStatus] = useState('');
  const [credentials, setCredentials] = useState<any>(null);

  useEffect(() => {
    setupTestAccount();
  }, []);

  const setupTestAccount = async () => {
    // Generate unique test account
    const timestamp = Date.now();
    const testEmail = `testuser${timestamp}@example.com`;
    const testPassword = 'Password123!';

    setStatus('Creating test account...');

    try {
      // Step 1: Create account
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          data: {
            name: 'Test User',
          },
        },
      });

      if (signUpError) {
        setStatus(`❌ Signup Error: ${signUpError.message}`);
        return;
      }

      setCredentials({ email: testEmail, password: testPassword });

      // Step 2: Try immediate login
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: testPassword,
      });

      if (loginError) {
        setStatus(`⚠️ Account created but cannot login immediately.

This usually means email confirmation is required in Supabase.

To fix this:
1. Go to your Supabase Dashboard
2. Navigate to Authentication → Providers → Email
3. DISABLE "Confirm email" toggle
4. Save changes
5. Try again

Your test credentials are saved below.`);
        return;
      }

      if (loginData.session) {
        setStatus('✅ Success! Account created and logged in. Redirecting to dashboard in 3 seconds...');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 3000);
      }
    } catch (error: any) {
      setStatus(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🚀 Quick Account Setup</h1>

        <div className={`rounded-lg p-6 mb-6 ${
          status.includes('✅') ? 'bg-green-100 border-green-300' :
          status.includes('❌') ? 'bg-red-100 border-red-300' :
          status.includes('⚠️') ? 'bg-yellow-100 border-yellow-300' :
          'bg-blue-100 border-blue-300'
        } border`}>
          <pre className="whitespace-pre-wrap text-sm">{status}</pre>
        </div>

        {credentials && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold mb-3">📝 Your Test Credentials</h2>
            <div className="bg-gray-50 rounded p-4 font-mono text-sm">
              <p><strong>Email:</strong> {credentials.email}</p>
              <p><strong>Password:</strong> {credentials.password}</p>
            </div>
            <div className="mt-4 space-y-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(credentials.email);
                  alert('Email copied to clipboard!');
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Copy Email
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(credentials.password);
                  alert('Password copied to clipboard!');
                }}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Copy Password
              </button>
            </div>
          </div>
        )}

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-2">⚠️ If Login Fails:</h3>
          <p className="text-sm mb-2">The most common issue is that Supabase requires email confirmation.</p>
          <p className="text-sm font-semibold">To disable email confirmation:</p>
          <ol className="list-decimal list-inside text-sm mt-2 space-y-1">
            <li>Go to your Supabase Dashboard</li>
            <li>Navigate to: <strong>Authentication → Providers → Email</strong></li>
            <li><strong>DISABLE</strong> the "Confirm email" toggle</li>
            <li>Save changes</li>
            <li>Refresh this page to create a new test account</li>
          </ol>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Try Again with New Account
          </button>
          <a
            href="/auth/login"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 inline-block"
          >
            Go to Login Page
          </a>
          <a
            href="/test-account"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 inline-block"
          >
            Use Fixed Test Accounts
          </a>
        </div>
      </div>
    </div>
  );
}